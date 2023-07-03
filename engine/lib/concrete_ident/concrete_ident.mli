type t [@@deriving show, yojson, compare, sexp, eq, hash]
type name = Concrete_ident_generated.name

module Kind : sig
  type t =
    | Type
    | Value
    | Lifetime
    | Constructor of { is_struct : bool }
    | Field
    | Macro
    | Trait
    | Impl
  [@@deriving show, yojson, compare, sexp, eq, hash]
end

val of_def_id : Kind.t -> Types.def_id -> t
val of_name : Kind.t -> name -> t
val eq_name : name -> t -> bool

type view = { crate : string; path : string list; definition : string }

val to_view : t -> view
val to_definition_name : t -> string
val to_crate_name : t -> string
val to_namespace : t -> string * string list
val map_path_strings : f:(string -> string) -> t -> t