use crate::triples::Arch;

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