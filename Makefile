watch:
	tsc-watch --onSuccess "node server/server.ts"

watch-debug:
	tsc-watch --onSuccess "node --inspect-brk server/server.ts"

codegen: codegen-fetch codegen-angular

codegen-export:
	# def
	lb export-api-def -o codegen/def.yaml
	cd codegen && \
		patch < def.patch
codegen-angular:
	# angular
	yes | ./node_modules/.bin/lb-sdk server/server.ts codegen/api/angular \
	  && cp -v ./common/helpers/shared-constants.ts ./codegen/api/angular

codegen-fetch: codegen-export
	# fetch
	cd codegen && \
		java -jar swagger-codegen-cli-2.2.3.jar generate -i def.yaml -l typescript-fetch -o api/fetch
	sed -i~ -e 's/XAny/any/g' codegen/api/fetch/api.ts
	find codegen/api/fetch -not -name api.ts -delete || true


build:
	tsc
	docker-compose build
	docker-compose push

up:
	node version.js up

down:
	node version.js down

deploy: build
	helm -n training-kube upgrade --install  api-test link/stack -f stack.yml
