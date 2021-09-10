import Mock from "mockjs";
let List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: i,
      title: "@ctitle(5, 10)",
      author: "@cname",
      readings: "@integer(300, 5000)",
      "star|1-3": "★",
      "status|1": ["published", "draft"],
      date: "@datetime",
    })
  );
}




export default {
    adminList: (config) => {
        const { pageNumber, pageSize, star } = JSON.parse(
          config.body
        );
        let start = (pageNumber - 1) * pageSize;
        let end = pageNumber * pageSize;
        let mockList = List.filter((item) => {
          if (star && item.star.length !== star) return false;
          return true;
        });
        let pageList = mockList.slice(start, end);
        return {
          code: 200,
          data: {
            total: mockList.length,
            list: pageList,
          },
        };
      },
  
 
};
