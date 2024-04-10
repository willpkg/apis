use crate::{defs::Package, triples::{Arch, Triple}};

use select::document::Document;
use select::predicate::Name;
use reqwest::blocking::get;

pub struct DebianFtp {
}

impl DebianFtp {
    pub fn new() -> DebianFtp {
        DebianFtp {
        }
    }

    pub fn list_pkgs(&mut self, name: &str) -> Result<Vec<String>, reqwest::Error> {

        let url = format!("http://ftp.debian.org/debian/pool/main/{}/{}", name.chars().nth(0).unwrap(), name);

        let response = get(url.clone())?;
        let body = response.text()?;
        let document = Document::from(body.as_str());

        let mut links = Vec::new();
        for node in document.find(Name("a")) {
            if let Some(href) = node.attr("href") {
                if href.ends_with(".deb") {
                    links.push(format!("{}/{}", url, href));
                }

            }
        }

        Ok(links)
    }

    pub fn filter_by_arch(&mut self, list: Vec<String>, arch: Arch, name: &str) -> Vec<String> {
        list.into_iter().filter(|x| {
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


