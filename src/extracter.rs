use ar::Archive;
use std::fs::File;
use std::io;

use tar::Archive as TarArchive;

use crate::defs::Package;

pub trait Extract {
    fn extract(self) -> Result<String, io::Error>; // <path_to_extracted_file>, <error>
}

impl Extract for Package {
    fn extract(self) -> Result<String, io::Error> {
        let mut archive = Archive::new(File::open(self.deb_link).unwrap());
        
        // extract data.tar.xz and control.tar.xz to /tmp/apt-alt
        for file in archive.entries().unwrap() {
            let mut file = file.unwrap();
            let path = file.path().unwrap();
            let path = path.to_str().unwrap();
            if path.ends_with("data.tar.xz") || path.ends_with("control.tar.xz") {
                let mut buffer = Vec::new();
                file.read_to_end(&mut buffer).unwrap();
                let mut file = File::create(format!("/tmp/apt-alt/{}", path)).unwrap();
                file.write_all(&buffer).unwrap();
            }
        }
        
        // extract control.tar.xz to /tmp/apt-alt/control
        let mut archive = TarArchive::new(File::open(format!("/tmp/apt-alt/control.tar.xz")).unwrap());

        for file in archive.entries().unwrap() {
            let mut file = file.unwrap();
            let path = file.path().unwrap();
            let path = path.to_str().unwrap();
            if path.ends_with("control") {
                let mut buffer = Vec::new();
                file.read_to_end(&mut buffer).unwrap();
                let mut file = File::create(format!("/tmp/apt-alt/control")).unwrap();
                file.write_all(&buffer).unwrap();
            }
        }

        // now extract data.tar.xz to /tmp/apt-alt/data
        let mut archive = TarArchive::new(File::open(format!("/tmp/apt-alt/data.tar.xz")).unwrap());

        for file in archive.entries().unwrap() {
            let mut file = file.unwrap();
            let path = file.path().unwrap();
            let path = path.to_str().unwrap();
            if path.ends_with("data") {
                let mut buffer = Vec::new();
                file.read_to_end(&mut buffer).unwrap();
                let mut file = File::create(format!("/tmp/apt-alt/data")).unwrap();
                file.write_all(&buffer).unwrap();
            }
        }
    }
}
