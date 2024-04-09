use suppaftp::FtpStream;

use crate::{defs::Package, triples::{Arch, Triple}};

struct DebianFtp {
    ftp: FtpStream
}

impl DebianFtp {
    fn new() -> DebianFtp {
        let ftp = FtpStream::connect("ftp.debian.org:21").unwrap();
        DebianFtp {
            ftp: ftp
        }
    }

    fn list_pkgs(&mut self, name: &str) -> Vec<Package> {
        let mut pkgs = Vec::new();
        let mut lines = self.ftp.list(Some(
            format!("debian/pool/main/{}", name).as_str()
        )).unwrap();
        for line in lines {
            let parts: Vec<&str> = line.split_whitespace().collect();
            let pkg = Package {
                name: parts[8].to_string(),
                version: parts[4].to_string(),
                source: parts[0].to_string(),
                build: parts[5].to_string(),
                install: parts[6].to_string(),
                depends: Vec::new(),
                provides: Vec::new(),
                conflicts: Vec::new(),
                replaces: Vec::new(),
                arch: Arch::from(parts[3])
            };
            pkgs.push(pkg);
        }
        pkgs
    }
}