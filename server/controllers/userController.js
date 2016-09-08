/**
 * Created by yuxuan on 9/2/16.
 */
const User = require('../models/user');
module.exports = {
  createUser: async (ctx, next) => {
    let user = new User(ctx.request.body);
    let result = await User.findOne({username: user.username}).exec();
    if(!result) {
      user = await user.save();
      user = user.toJSON();
      delete user.password;
      ctx.body = {'user': user};
    }else {
      ctx.body = {error: true,errMsg:"用户已存在"};
    }
  }
}