const allCourses = [
  { id: 1, name: "資料庫系統", day: "一", start: "3", end: "4" },
  { id: 2, name: "作業系統", day: "一", start: "3", end: "4" },
  { id: 3, name: "人工智慧", day: "三", start: "5", end: "7" },
  { id: 4, name: "計算機網路", day: "五", start: "2", end: "3" },
];

function Courses() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">課程查詢</h2>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>課程名稱</th>
            <th>時間</th>
          </tr>
        </thead>

        <tbody>
          {allCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>
                星期{course.day} {course.start}-{course.end}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;