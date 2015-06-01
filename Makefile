# -------------------------------------------------- #
APPENV=production
DISTDIR=dist
# -------------------------------------------------- #
TEST_SERVER=fjarrkontrollen-test.ub.gu.se
DEMO_SERVER=fjarrkontrollen-demo.ub.gu.se
LIVE_SERVER=fjarrkontrollen.ub.gu.se
# -------------------------------------------------- #
TEST_DESTDIR=/apps/fjarrkontrollen
DEMO_DESTDIR=/apps/demo/fjarrkontrollen
LIVE_DESTDIR=/apps/fjarrkontrollen
# -------------------------------------------------- #

all:
	@echo -n "run like this:"
	@echo    "'make test'"
	@echo -n "           or:"
	@echo    "'make demo'"
	@echo -n "           or:"
	@echo    "'make live'"


test:
	./create-deploy-info.sh
	ember build --environment=production-test
	mv deploy-info.txt dist
	scp -r $(DISTDIR)/* app-user@$(TEST_SERVER):$(TEST_DESTDIR)/

demo:
	./create-deploy-info.sh
	ember build --environment=production-demo
	mv deploy-info.txt dist
	scp -r $(DISTDIR)/* app-user@$(DEMO_SERVER):$(DEMO_DESTDIR)/

live:
	./create-deploy-info.sh
	ember build --environment=production-live
	mv deploy-info.txt dist
	scp -r $(DISTDIR)/* app-user@$(LIVE_SERVER):$(LIVE_DESTDIR)/
