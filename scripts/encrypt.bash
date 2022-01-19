#! /bin/bash

[ -z "$1" ] && {
    echo "must provide file do encrypt"
    exit 1
}

[ -d "$1" ] && {
    echo "must provide a file, not a directory"
    exit 2
}


[ -z "$2" ] && {
    echo "must provide output file"
    exit 3
}



gpg -c --armor --cipher-algo AES256 --no-symkey-cache --output "$2" "$1"

# [ "$(uname)" == "Darwin" ] || tar xvzf "$2" -C server