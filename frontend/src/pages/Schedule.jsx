import { useState } from "react";

// 星期
export const days = ["日","一","二","三","四","五","六"];

// 節次
export const periods = ["1","2","3","4","Z","5","6","7","8","9","A","B","C","D","E","F"];

// 假資料（start ~ end）
const initialCourses = [
  { id: 1, name: "資料庫系統", day: "一", start: "2", end: "3" },
  { id: 2, name: "作業系統", day: "一", start: "3", end: "4" }, // 衝堂
  { id: 3, name: "人工智慧", day: "三", start: "5", end: "7" },
];

function Schedule({ courses, setCourses }) {

  // 退選（整堂刪掉）
  const handleDrop = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // 判斷某格有哪些課（核心🔥）
  const getCoursesInCell = (day, period) => {
    const currentIndex = periods.indexOf(period);

    return courses.filter((c) => {
      const startIndex = periods.indexOf(c.start);
      const endIndex = periods.indexOf(c.end);

      return (
        c.day === day &&
        currentIndex >= startIndex &&
        currentIndex <= endIndex
      );
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">我的課表</h2>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>節次</th>
            {days.map((day) => (
              <th key={day}>星期{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {periods.map((p) => (
            <tr key={p}>
              <td className="fw-bold">{p}</td>

              {days.map((day) => {
                const cellCourses = getCoursesInCell(day, p);
                const isConflict = cellCourses.length > 1;

                return (
                  <td
                    key={day}
                    style={{
                      backgroundColor: isConflict ? "#f8d7da" : "white",
                      minWidth: "120px",
                      height: "80px",
                      verticalAlign: "top"
                    }}
                  >
                    {cellCourses.map((course) => (
                      <div
                        key={course.id}
                        className="border rounded p-1 mb-1"
                        style={{ fontSize: "12px" }}
                      >
                        <div>{course.name}</div>

                        <div className="d-flex justify-content-end mt-1">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDrop(course.id)}
                          >
                            ❌
                          </button>
                        </div>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;