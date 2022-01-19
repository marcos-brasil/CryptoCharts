#! /bin/bash

[ -z "$1" ] && {
    echo "must provide file do decrypt"
    exit 1
}

[ -z "$2" ] && {
    echo "must provide output file"
    exit 2
}


gpg --decrypt --no-symkey-cache --output "$2" "$1"

[ "$(uname)" == "Darwin" ] || tar xvzf "$2" -C server