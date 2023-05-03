//! Tests for the hacspec linter

use std::process::Command;

mod util;
use util::*;

const TESTS: [Test; 2] = [
    Test {
        stderr: "",
        manifest_path: "lint/hacspec_tests/v1-lib/Cargo.toml",
    },
    Test {
        stderr: "warning: [Circus] Mutable arguments are not supported
 --> mut_arg/src/lib.rs:1:23
  |
1 | pub fn add(left: &mut usize, right: usize) {
  |                       ^^^^^

warning: `mut_arg` (lib) generated 1 warning",
        manifest_path: "lint/hacspec_tests/mut_arg/Cargo.toml",
    },
];

#[test]
fn run() {
    install_driver();

    for test in TESTS {
        let mut cmd = Command::new("cargo");
        cmd.current_dir("../");

        let output = cmd
            .args(&[
                "run",
                "--bin",
                "cargo-circus",
                "--",
                "-C",
                "--manifest-path",
                test.manifest_path,
                ";",
                "lint",
                "hacspec",
            ])
            .output()
            .unwrap();
        eprintln!("{:?}", output);

        let err_str = filter_stderr(&output.stderr);
        assert_eq!(err_str, test.stderr);
    }
}
