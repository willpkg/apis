.install-rust:
	echo "Rust not found, installing rust"
	curl https://sh.rustup.rs -sSf | sh -s -- -y
	. "$$HOME/.cargo/env"

.install-npm:
	echo "npm not found, installing npm"
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
	export NVM_DIR="/usr/local/share/nvm"
	[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
	[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

	nvm install node

.check-for-rust:
#	https://stackoverflow.com/questions/5618615/check-if-a-program-exists-from-a-makefile
	ifeq (, $(shell which rustup))
		$(.install-rust)
	endif

	ifeq (, $(shell which npx))
		$(.install-npm)
	endif

.install-deps:
	$(.check-for-rust)
	npm install
	rustup target add wasm32-unknown-unknown

# default
dev:
	npx wrangler dev
	
create-new:
	npx wrangler generate tmp https://github.com/cloudflare/workers-sdk/templates/experimental/worker-rust
	mv -f tmp/* ./
	.install-deps

deploy:
	npx wrangler deploy