import React, { Component } from "react";
import { Card, Progress } from "antd";
import { connect } from "react-redux";
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components//Mallki'
import reward from "@/assets/images/reward.jpg";
import { getTypeInfo, getArticleList } from "@/api/article";
import './index.less'
class BoxCard extends Component {
  state = {
    vue: 0,
    typeList: [],
    percentageList: []
  };

  componentDidMount() {
    this.getTypeData()
    this.fetchArticleList()
    // console.log(this.props)
  }
  getTypeData = () => {
    getTypeInfo().then(res => {
      if (res) {
        let list = res.data.data
        list = list.map(item => {
          return item.typeName
        })
        console.log(list)
        this.setState({
          typeList: res.data.data
        }, () => {
        })
      }


    })
  }

  fetchArticleList = () => {
    getArticleList().then(res => {
      const articleList = res.data.list
      const totalLenght = articleList.length
      let newData = {}
      //数组按照属性值分类
      articleList.forEach(item => {
        if (!Object.keys(newData).includes(item.typeName)) {
          newData[item.typeName] = []
        }
        newData[item.typeName] = [...newData[item.typeName], item]
      })
      console.log(newData)
      let percentageList = Object.keys(newData).reduce((pre, next) => {
        return pre = [...pre,
        {
          typeName: next,
          length: newData[next].length,
          percentage: totalLenght <= 0 ? "0%" : (Math.round(newData[next].length / totalLenght * 10000) / 100.00) 
        }
        ]
      }, [])
      console.log(percentageList)
      this.setState({ percentageList });
    });
  };
  render() {
    const { avatar } = this.props
    return (
      <div className="box-card-component">
        <Card
          cover={
            <img
              alt="example"
              src={reward}
              style={{ height: "480px" }}
            />
          }
        >
          <div style={{ position: 'relative' }}>
            {/* 动画组件 */}
            <PanThumb image={avatar} className="panThumb" />
            <Mallki className="mallki-text" text={this.props.name} />

            {
              this.state.percentageList.map((item, index) => {
                return (
                  <div style={{ paddingTop: "35px" }} className="progress-item" key={index}>
                    <span>{item.typeName}</span>
                    <Progress percent={item.percentage} />
                  </div>
                )
              })

            }

          </div>
        </Card>
      </div>
    );
  }
}

export default connect((state) => state.user)(BoxCard);