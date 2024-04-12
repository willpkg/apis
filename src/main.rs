mod triples;
mod ftp;
mod defs;
mod extracter;

use defs::Filter;
use extracter::Extract;

fn main() {
    let pkgs = ftp::DebianFtp::new().list_pkgs("curl").unwrap().filter_by_arch(triples::Arch::Amd64, "curl").to_pkg();

    for pkg in pkgs {
        println!("{:#?}\n, {:?}", pkg, pkg.extract());
    }
}
