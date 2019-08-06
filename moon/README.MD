## 更新日志 

### 2019年08月06日16:54:35

> 添加`product`接口, 实现以下功能:

  1.对产品的`新增`
  2.对产品的`编辑`
  3.对产品的`删除`
  4.对产品的`查询`
  5.合并`新增`和`编辑`接口
```
router.post('/add', async (ctx, next) => { //  添加
  let res
  if (ctx.request.body.createDate) {
    ctx.request.body.createDate = new Date(ctx.request.body.createDate).getTime()
  }
  let para = ctx.request.body
  if (para._id) { //  修改
    let where = {'_id': ctx.request.body._id}
    res  = await product.update(where, para)
  } else { //  添加
    res  = await product.create(para)
  }
  set.tips(ctx, res)
})
```

> 备注
  无
