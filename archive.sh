# !/bin/bash

set -e

# ========= OPTS ===========
# Describe script here

function help () {
    echo "<insert description>"
    echo ""
    echo "Usage:"
    echo ""
    echo "Option:"
    echo "  -h     Print this help."
    echo ""
    echo "Description: "
    echo "  <COMMAND>                    <INFO>"
}

while getopts "h" option; do
    case "${option}" in
        h) # display Help
            help
            exit 0
            ;;
    esac
done

# ========= ARGS ===========
# Check arguments script uses here
# (including env variables)

# NAME=archive.sh
# if [[ -z archive.sh ]]; then
#   echo "Must specify NAME (first argument)"
#   exit 1;
# fi

# ========= MAIN ===========
# Execute main script function here


mv daily_dunis.jpeg archive/$(date +%Y-%m-%d_%Hh%Mm%Ss).jpeg
