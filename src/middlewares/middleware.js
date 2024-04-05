exports.middlewareGlobal = (req, res, next) => {
    if(req.body.cliente){
        req.body.cliente = req.body.cliente.replace('Miranda', 'NÃO USE MIRANDA');
        console.log();
        console.log(`Vi que você postou ${req.body.cliente}`);
        console.log();
    }
    res.locals.umaVariavelLocal = 'Este é o valor da variavel local.'; // Injetando um valor em todas as rotas. Será injetado em todas tendo em vista que, todas as rotas passam pelo middlewareGlobal.
    next();
};

exports.checkCsurfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.render('404');
    }
};

exports.csurfMiddleware = (req, res, next) =>{
    res.locals.csurfToken = req.csrfToken();
    next();
};