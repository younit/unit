## 更新日志 

### 2019年08月16日17:05:49

> 修改`setting` 页面样式

> 增加`task`页面

> 备注
  对接后台接口
  `task` - 列表  `1`未接任务, `2`已接任务, `3`完成任务, 不传查所有

### 2019年08月06日16:45:00

> 添加`hot`管理页面, 实现以下功能:

1. 调用`product`接口
2. 排版`hot`页面样式

> 备注

  实现多元素整齐行排,  
  父元素可以使用`display:flex`结合`flex-wrap`,  
  子元素使用`fkex-grow: 1`并且设置宽度即可。  
  比如一行三元素`width:30%`调整间距。  
  具体代码如下, 详情见`hot`页面搜索`.van-list`  
  ```
  .van-list
    padding eight 0
    margin 0 0 50px 0
    display flex
    flex-wrap wrap
    .list:nth-child(3n+0)
      margin-right eight
    .list
      width 30%
      flex-grow 1
      margin-left eight
      height 28vh
      position relative
  ```
