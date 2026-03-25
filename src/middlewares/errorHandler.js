const errorHandler = (err, req, res, next) => {
  if(err.status){
    res.status(err.status).json({msg: err.message});
  }else if(err.status === 400){
    res.status(400).send({msg: 'Information missing!'});
  }else if(err.status === 404){
    res.status(404).send({msg: 'User not found!'});
  }
  else{
    res.status(500).json({msg: 'Internal Server Error'});
  }
}

export default errorHandler;