DISTDIR=dist
TESTSERVER=fjarrkontrollen-test.ub.gu.se
DRIFTSERVER=fjarrkontrollen.ub.gu.se
DESTDIR=/apps/fjarrkontrollen
APPENV=production


all:
	@echo -n "run like this:"
	@echo    "'make deploy-test'"
	@echo -n "           or:"
	@echo    "'make deploy-drift'"



deploy-drift:
	./create-deploy-info.sh
	ember build --environment=production-live
	mv deploy-info.txt dist
	scp -r $(DISTDIR)/* $(DRIFTSERVER):$(DESTDIR)/


deploy-test:
	./create-deploy-info.sh
	ember build --environment=production-test
	mv deploy-info.txt dist
	scp -r $(DISTDIR)/* app-user@$(TESTSERVER):$(DESTDIR)/
