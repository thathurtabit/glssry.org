#!/bin/bash

GREEN=$(tput setaf 2)
RED=$(tput setaf 1)
NC=$(tput sgr0)

# exit when any command fails
set -e
# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\n⚠️ ${RED} Uh oh. Failed to complete: \"${last_command}\". Run this task individually to debug.\n${NC}\n"' EXIT

echo "\n"
echo "${GREEN}Installing latest packages${NC}"
pnpm i
echo "\n"
echo "${GREEN}Running lint --fix${NC}"
pnpm run lint:fix
echo "\n"
echo "${GREEN}Running unit tests${NC}"
pnpm run test:ci
echo "\n"
echo "${GREEN}Running build${NC}"
pnpm run build
echo "\n"
echo "${GREEN}Running commitizen${NC}"
echo "(Make sure you've staged your file changes)"
pnpm run cz --no-verify
echo "\n"

echo "⚙️ ${GREEN}Tasks completed:\n${NC}"
echo "${GREEN}✅ Installed latest packages\n✅ Ran lint --fix\n✅ Ran unit tests\n✅ Created build succsfully\n✅ Ran commitizen${NC}\n"

echo "✨${GREEN}All done!✨ \nDon't forget to push your changes! \nHave a nice day. 😸${NC} \n"

trap - EXIT