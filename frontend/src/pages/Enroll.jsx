import { periods, days } from "./Schedule"; // 你之前定義的節次/星期

// 這裡假資料可以和 Courses 相同
const allCourses = [
  { id: 1, name: "資料庫系統", day: "一", start: "3", end: "4" },
  { id: 2, name: "作業系統", day: "一", start: "3", end: "4" },
  { id: 3, name: "人工智慧", day: "三", start: "5", end: "7" },
  { id: 4, name: "計算機網路", day: "五", start: "2", end: "3" },
];

function Enroll({ selectedCourses, setSelectedCourses }) {
  const handleAdd = (course) => {
    if (selectedCourses.some((c) => c.id === course.id)) {
      alert("已加入此課程！");
      return;
    }
    setSelectedCourses([...selectedCourses, course]);
  };

  const handleDrop = (id) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">課程加退選</h2>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>課程名稱</th>
            <th>時間</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {allCourses.map((course) => {
            const isAdded = selectedCourses.some((c) => c.id === course.id);

            return (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>
                  星期{course.day} {course.start}-{course.end}
                </td>
                <td>
                  {isAdded ? (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDrop(course.id)}
                    >
                      退選 ❌
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAdd(course)}
                    >
                      加入
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Enroll;