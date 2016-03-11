#!/bin/bash

# Ascertain directory in which script lives; compatible with all UNIX
# Thanks to kenorb
# http://stackoverflow.com/a/17744637/5257399
MYDIR=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

pushd $MYDIR > /dev/null
# upon any kind of termination, return to our original directory
trap "popd > /dev/null" EXIT SIGHUP SIGINT SIGTERM

#######

# Check if program exists; thanks to lhunath, Darryl Hein
# http://stackoverflow.com/a/677212/5257399
command -v security >/dev/null 2>&1 || { echo >&2 "I require Mac OS X 'security' CLI but it's not installed. Aborting."; exit 1; }
command -v lftp >/dev/null 2>&1 || { echo >&2 "I require 'lftp' but it's not installed. Try 'brew install lftp'. Aborting."; exit 1; }

# Build Production distribution
npm run build

HOST="ftp.birch-family.me.uk"
USER=$(security find-internet-password -s "ftp.birch-family.me.uk" | grep -E "^    \"acct\"" | sed -E "s/.*=\"(.*)\"/\\1/")
PASS=$(security find-internet-password -wa $USER)
FTPURL="ftp://$USER:$PASS@$HOST"

# Lftp invocation thanks to GabrieleV, easel
# http://serverfault.com/a/106365
LCD=$MYDIR/dist
RCD="/"
lftp -c "set ftp:list-options -a;
open '$FTPURL';
lcd $LCD;
cd $RCD;
mirror --reverse \
       --exclude-glob .DS_Store \
       --exclude-glob shared-assets/*.mp3 \
       --exclude-glob experiments/img/* \
       --exclude-glob games/img/* \
       --verbose"