module Rust_primitives.Hax.Folds

open Rust_primitives
open Core.Ops.Range
open FStar.Mul

(**** `s.chunks_exact(chunk_size).enumerate()` *)
/// Predicate that asserts a slice `s_chunk` is exactly the nth chunk
/// of the sequence `s`
let nth_chunk_of #t
  (s: Seq.seq t)
  (s_chunk: Seq.seq t {Seq.length s_chunk > 0})
  (chunk_nth: nat {chunk_nth < Seq.length s / Seq.length s_chunk})
  =  Seq.slice s (Seq.length s_chunk * chunk_nth) (Seq.length s_chunk * (chunk_nth + 1))
  == s_chunk

/// Fold function that is generated for `for` loops iterating on
/// `s.chunks_exact(chunk_size).enumerate()`-like iterators
val fold_enumerated_chunked_slice
  (#t: Type0) (#acc_t: Type0)
  (chunk_size: usize {v chunk_size > 0})
  (s: t_Slice t)
  (inv: acc_t -> (i:usize{v i <= Seq.length s / v chunk_size}) -> Type0)
  (init: acc_t {inv init (sz 0)})
  (f: ( acc:acc_t
      -> item:(usize & t_Slice t) {
        let (i, s_chunk) = item in
          v i < Seq.length s / v chunk_size
        /\ length s_chunk == chunk_size
        /\ nth_chunk_of s s_chunk (v i)
        /\ inv acc i
      }
      -> acc':acc_t {
        inv acc' (fst item +! sz 1)
      }
      )
  )
  : result: acc_t {inv result (mk_int (Seq.length s / v chunk_size))}

(**** `s.enumerate()` *)
/// Fold function that is generated for `for` loops iterating on
/// `s.enumerate()`-like iterators
val fold_enumerated_slice
  (#t: Type0) (#acc_t: Type0)
  (s: t_Slice t)
  (inv: acc_t -> (i:usize{v i <= v (length s)}) -> Type0)
  (init: acc_t {inv init (sz 0)})
  (f: (acc:acc_t -> i:(usize & t) {v (fst i) < v (length s) /\ inv acc  (fst i)}
                 -> acc':acc_t    {v (fst i) < v (length s) /\ inv acc' (fst i)}))
  : result: acc_t {inv result (length s)}

(**** `(start..end_).step_by(step)` *)
unfold let fold_range_step_by_wf_index (#u: Lib.IntTypes.inttype)
  (start: int_t u) (end_: int_t u)
  (step: usize {v step > 0}) (strict: bool) (i: int)
  = v start <= v end_ ==> ( i >= v start 
                        /\ (if strict then i < v end_ else i <= v end_ + v step))
  // /\ i % v step == v start % v step

#push-options "--z3rlimit 80"
unfold let fold_range_step_by_upper_bound (#u: Lib.IntTypes.inttype)
  (start: int_t u) (end_: int_t u)
  (step: usize {v step > 0})
  : end':int {fold_range_step_by_wf_index start end_ step false end'}
  = if v end_ <= v start 
    then v end_
    else
      let range: nat = v end_ - v start in
      let k: nat = range / v step in
      let end' = v start + k * v step in
      FStar.Math.Lemmas.division_propriety range (v step);
      end'
#pop-options

/// Fold function that is generated for `for` loops iterating on
/// `s.enumerate()`-like iterators
val fold_range_step_by
  (#acc_t: Type0) (#u: Lib.IntTypes.inttype)
  (start: int_t u)
  (end_: int_t u)
  (step: usize {v step > 0 /\ range (v end_ + v step) u})
  (inv: acc_t -> (i:int_t u{fold_range_step_by_wf_index start end_ step false (v i)}) -> Type0)
  (init: acc_t {inv init start})
  (f: (acc:acc_t -> i:int_t u  {v i < v end_ /\ fold_range_step_by_wf_index start end_ step true (v i) /\ inv acc i}
                 -> acc':acc_t {(inv acc' (mk_int (v i + v step)))}))
  : result: acc_t {inv result (mk_int (fold_range_step_by_upper_bound start end_ step))}

(**** `start..end_` *)
unfold let fold_range_wf_index (#u: Lib.IntTypes.inttype)
  (start: int_t u) (end_: int_t u)
  (strict: bool) (i: int)
  = v start <= v end_
  ==> ( i >= v start 
     /\ (if strict then i < v end_ else i <= v end_))

let rec fold_range
  (#acc_t: Type0) (#u: Lib.IntTypes.inttype)
  (start: int_t u)
  (end_: int_t u)
  (inv: acc_t -> (i:int_t u{fold_range_wf_index start end_ false (v i)}) -> Type0)
  (init: acc_t {inv init start})
  (f: (acc:acc_t -> i:int_t u  {v i <= v end_ /\ fold_range_wf_index start end_ true (v i) /\ inv acc i}
                 -> acc':acc_t {(inv acc' (mk_int (v i + 1)))}))
  : Tot (result: acc_t {inv result (if v start > v end_ then start else end_)}) 
        (decreases v end_ - v start)
  = if v start < v end_
    then fold_range (start +! mk_int 1) end_ inv (f init start) f
    else init
