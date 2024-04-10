use crate::triples::Arch;

#[derive(Debug)]
pub struct Package {
    pub name: String,
    pub version: String,
    pub source: String,
    pub build: String,
    pub install: String,
    pub depends: Vec<Package>,
    pub provides: Vec<String>,
    pub conflicts: Vec<String>,
    pub replaces: Vec<String>,
    pub arch: Arch,
}

pub trait Filter {
    fn filter_by_arch(self, arch: Arch, name: &str) -> Vec<String>;
}


impl Filter for Vec<String> {
    fn filter_by_arch(self, arch: Arch, name: &str) -> Vec<String> {
        self.into_iter().filter(|x| {
            // first, strip .deb from the end
            let x = x.trim_end_matches(".deb");

            // now extract from the last underscore
            let mut parts: Vec<&str> = x.split("_").collect();

            let mut slash_parts: Vec<&str> = x.split("/").collect();

            // now extract the arch
            let found_arch = parts.pop();

            // now check if the arch is the same as the one we want
            Some(arch.to_string().as_str()) == Some(found_arch.unwrap()) && slash_parts.pop().unwrap().starts_with(name)
        }).collect()
    }
}