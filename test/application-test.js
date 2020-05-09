describe("Application test", function(){
  it("Test bootstrap", function(done){
    try{
      require("./../app/bootstrap");
      done();
    }catch(err){
      done(err);
    }
  });
});