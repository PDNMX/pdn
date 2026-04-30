echo $NUM

awk -v n=$NUM '{
    result = ""
    for (i = n + 1; i <= NF; i++) {
        result = (result == "" ? "" : OFS) $i
    }
    print result
}' errores.txt
