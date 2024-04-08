//! apis/triple
//! deals with host triplets, as defined in <project-root>/triples.md

pub enum Arch {
    Aarch64,
    Arm,
    Mips,
    Powerpc,
    Riscv,
    Sparc,
    X86,
    X86_64,
}

pub enum Os {
    Windows,
    Linux,
    Macos,
    Android,
    Ios,
    Freebsd,
    Netbsd,
    Openbsd,
    Dragonfly,
    Solaris,
    Redox,
    UnixUnknown,
}

pub enum Env {
    Gnu,
    Msvc,
    Musl,
    Uclibc,
    Android,
    Emscripten,
    Sgx,
    Unknown,
}

pub struct Triple {
    pub arch: Arch,
    pub os: Os,
    pub env: Env,
}

impl core::fmt::Display for Arch {
    fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
        match self {
            Arch::Aarch64 => write!(f, "aarch64"),
            Arch::Arm => write!(f, "arm"),
            Arch::Mips => write!(f, "mips"),
            Arch::Powerpc => write!(f, "powerpc"),
            Arch::Riscv => write!(f, "riscv"),
            Arch::Sparc => write!(f, "sparc"),
            Arch::X86 => write!(f, "x86"),
            Arch::X86_64 => write!(f, "x86_64"),
        }
    }
}

impl core::fmt::Display for Os {
    fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
        match self {
            Os::Windows => write!(f, "windows"),
            Os::Linux => write!(f, "linux"),
            Os::Macos => write!(f, "macos"),
            Os::Android => write!(f, "android"),
            Os::Ios => write!(f, "ios"),
            Os::Freebsd => write!(f, "freebsd"),
            Os::Netbsd => write!(f, "netbsd"),
            Os::Openbsd => write!(f, "openbsd"),
            Os::Dragonfly => write!(f, "dragonfly"),
            Os::Solaris => write!(f, "solaris"),
            Os::Redox => write!(f, "redox"),
            Os::UnixUnknown => write!(f, "unix-unknown"),
        }
    }
}

impl core::fmt::Display for Env {
    fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
        match self {
            Env::Gnu => write!(f, "gnu"),
            Env::Msvc => write!(f, "msvc"),
            Env::Musl => write!(f, "musl"),
            Env::Uclibc => write!(f, "uclibc"),
            Env::Android => write!(f, "android"),
            Env::Emscripten => write!(f, "emscripten"),
            Env::Sgx => write!(f, "sgx"),
            Env::Unknown => write!(f, "unknown"),
        }
    }
}

impl core::fmt::Display for Triple {
    fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
        write!(f, "{}-{}-{}", self.arch, self.os, self.env)
    }
}

impl Triple {
    pub fn new(arch: Arch, os: Os, env: Env) -> Self {
        Triple { arch, os, env }
    }

    pub fn from_string(s: String) -> Option<Self> {
        // split at either '-' or ' '
        let mut parts = s.split(|c| c == '-' || c == ' ');
        let arch = match parts.next() {
            Some("aarch64") => Arch::Aarch64,
            Some("arm") => Arch::Arm,
            Some("mips") => Arch::Mips,
            Some("powerpc") => Arch::Powerpc,
            Some("riscv") => Arch::Riscv,
            Some("sparc") => Arch::Sparc,
            Some("x86") => Arch::X86,
            Some("x86_64") => Arch::X86_64,
            _ => return None,
        };
        let os = match parts.next() {
            Some("windows") => Os::Windows,
            Some("linux") => Os::Linux,
            Some("macos") => Os::Macos,
            Some("android") => Os::Android,
            Some("ios") => Os::Ios,
            Some("freebsd") => Os::Freebsd,
            Some("netbsd") => Os::Netbsd,
            Some("openbsd") => Os::Openbsd,
            Some("dragonfly") => Os::Dragonfly,
            Some("solaris") => Os::Solaris,
            Some("redox") => Os::Redox,
            Some(_) => Os::UnixUnknown,
            None => {
                return None;
            }
        };
        let env = match parts.next() {
            Some("gnu") => Env::Gnu,
            Some("msvc") => Env::Msvc,
            Some("musl") => Env::Musl,
            Some("uclibc") => Env::Uclibc,
            Some("android") => Env::Android,
            Some("emscripten") => Env::Emscripten,
            Some("sgx") => Env::Sgx,
            Some(_) => Env::Unknown,
            None => {
                return None;
            }
        };

        Some(Triple::new(arch, os, env))
    }
}