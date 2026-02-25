#!/bin/bash
set -e

# CI helper script: sets up a Frappe bench environment for running Jana tests
# Used by .github/workflows/tests.yml

echo "::group::Configure MariaDB"
mysql --host 127.0.0.1 --port 3306 -u root -p${DB_ROOT_PASSWORD} -e "
  SET GLOBAL character_set_server = 'utf8mb4';
  SET GLOBAL collation_server = 'utf8mb4_unicode_ci';
"
echo "::endgroup::"

echo "::group::Install system dependencies"
sudo apt-get update -qq
sudo apt-get install -qq -y wkhtmltopdf
echo "::endgroup::"

echo "::group::Initialize bench"
bench init ~/frappe-bench \
  --skip-redis-config-generation \
  --skip-assets \
  --python "$(which python)" \
  --frappe-branch version-15
echo "::endgroup::"

echo "::group::Install jana app"
cd ~/frappe-bench
bench get-app jana "${GITHUB_WORKSPACE}"
echo "::endgroup::"

echo "::group::Create test site"
mkdir -p ~/frappe-bench/sites/test_site
cp "${GITHUB_WORKSPACE}/.github/helper/site_config.json" \
   ~/frappe-bench/sites/test_site/site_config.json

bench new-site test_site \
  --mariadb-root-password "${DB_ROOT_PASSWORD}" \
  --admin-password admin \
  --no-mariadb-socket
echo "::endgroup::"

echo "::group::Install jana on site"
bench --site test_site install-app jana
bench --site test_site set-config allow_tests true
echo "::endgroup::"

echo "Frappe bench setup complete."
