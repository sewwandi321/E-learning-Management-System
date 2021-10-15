const { check, validationResult } = require('express-validator');
//const { rootCertificates } = require('node:tls');
 exports.validateSigninRequest=
[
    check('name')
    .notEmpty()
    .withMessage(' name is required'),
    check('email')
    .isEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 chracter long')
];
exports.validateSignupRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    // check('password')
    // .isLength({ min: 6 })
    // .withMessage('Password must be at least 6 character long')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })

    }
    next();
   
}

//Validate the Schedule when creating or updating
exports.validate = (method) => {
  switch (method) {
    case 'Schedule': {
     return [ 
        body('ClassId', 'Class Id doesn t exists').exists(),
        body('hall', 'Hall doesn t exists').exists(),
        body('teachername','Teacher Name doesn t exists').exists(),
        body('Studentbatch','Batch Name doesn t exists').exists(),
		body('day', 'Day doesn t exists').exists(),
		body('starttime', 'Strating time doesn t exists').exists(),
		body('endtime', 'Ending time doesn t exists').exists(),
		   
			
       ]   
    }
  }
}