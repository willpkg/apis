# TODO finish this
check-for-rust:
#	https://stackoverflow.com/questions/5618615/check-if-a-program-exists-from-a-makefile
	EXECUTABLES = rustc rustup npx
	K := $(foreach exec,$(EXECUTABLES),\
			$(if $(shell which $(exec)),some string,$(error "No $(exec) in PATH")))

install-deps:
	check-for-rust
	rustup target add wasm32-unknown-unknown