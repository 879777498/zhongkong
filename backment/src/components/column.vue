<template>
  <div class="user">
    <template>
     <div class="head">
         <span>栏目风格设置</span>
         <ul @click="color($event)">
             <li v-for="(item, index) in 10" :key="index">
                 <span :class="['color'+index,index==0?'borderred':'']"></span>
             </li>
         </ul>
     </div>
     <div class="main">
         <div class="secnav">
             <span>栏目设置</span>
             <el-button  type="danger" size="mini" round plain>删除</el-button>
             <el-button  type="primary" size="mini" round plain>新建</el-button>
         </div>
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span class="floatright">
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
                  编辑
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
                  删除
                </el-button>
        </span>
      </span>
    </el-tree>
     </div>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
   data ()  {
      return {
        radio:0,
        data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 2,
          label: '二级 1-1',
        },{
          id: 3,
          label: '二级 1-1',
        },{
          id: 4,
          label: '二级 1-1',
        },]
      }]
      }
    },
    computed:{
       editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
   methods: {
      color(e){
        if(e.target.className){
          let red = document.getElementsByClassName("borderred");
          if(red.length>0){
            red[0].classList.remove("borderred");
          }
          e.target.className += ' borderred'
        }
      },
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      }
    }
    
}
</script>

<style lang="less" scoped>
.custom-tree-node{
  width: 100%;
  span:nth-of-type(1){
    float: left;
  }
}
.floatright{
  float: right;
}
.secnav{
  height: 50px;
  span{
    display: block;
    float: left;
  }
  button{
    float: right;
    margin: 0 5px;
  }
}
.main{
  margin-top: 15px;
  border: #ddd solid 1px;
  width: 439px;
  height: 447px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(172, 172, 172, 0.5);
  background-color: #ffffff;
  padding: 20px;
  
}
.borderred{
    border: 3px solid red !important;
}
.color0{
  background-color: #4a90e2
}
.color1{
  background-color: #b8e986;
}
.color2{
  background-color: #8b572a;
}
.color3{
  background-color: #474747;
}
.color4{
  background-color: #bd10e0;
}
.color5{
  background-color: #5d5d5d;
}
.color6{
  background-color: #50e3c2;
}
.color7{
  background-color: #000000;
}
.color8{
  background-color: #9b9b9b;
}
.color9{
  background-color: #f5a623;
}
.head{
    width: 510px;
    height: 130px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(172, 172, 172, 0.5);
    background-color: #ffffff;
    span{
        display: block;
        height: 22px;
        margin: 15px;
        text-align: left;
    }
    ul{
        list-style: none;
        margin-left: 10px;
    }
    li{
        float: left;
        span{
            width: 30px;
            height: 30px;
            display: block;
            margin: 5px;
            border-radius: 4px;
            border: 1px solid #ddd;
            box-shadow: 0 7px 4px 0 #e8e8e8;
            // background-color: #5d5d5d;
        }
    }
}
.user{
    padding-left: 60px;
}
</style>
