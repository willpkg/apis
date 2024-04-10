mod triples;
mod ftp;
mod defs;

use defs::Filter;

fn main() {
    println!("{:?}", ftp::DebianFtp::new().list_pkgs("curl").unwrap().filter_by_arch(triples::Arch::Amd64, "curl"));
}
