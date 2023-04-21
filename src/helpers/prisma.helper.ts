

//Retornar apenas os campos liberados de um objeto
export function filtrarCampos(objeto: Object, campos: string[]) {

    let retornar = {};

    Object.keys(objeto).forEach((chave) => {
        if (campos.includes(chave))
            retornar[chave] = objeto[chave]
    })

    return retornar;
}