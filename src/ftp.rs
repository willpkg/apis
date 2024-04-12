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
}


