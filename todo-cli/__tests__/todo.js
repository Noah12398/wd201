const todoList = require("../todo");

const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };
  
  const dateToday = new Date();
  const today = formattedDate(dateToday);
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1))
  );
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1))
  );

  
test("Should add new todo", () => {
    const todos = todoList();
    expect(todos.all.length).toBe(0);
    todos.add({ title: "Test todo", dueDate: today, completed: false });
    expect(todos.all.length).toBe(1);
  });

  
test("Should mark todo as complete", () => {
    const todos = todoList();
    todos.add({ title: "Test todo", dueDate: today, completed: false });
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  
test("Should return overdue items", () => {
    const todos = todoList();
    todos.add({ title: "Overdue task", dueDate: yesterday, completed: false });
    expect(todos.overdue().length).toBe(1);
  });
  
test("Should return due today items", () => {
    const todos = todoList();
    todos.add({ title: "Today task", dueDate: today, completed: false });
    expect(todos.dueToday().length).toBe(1);
  });

test("Should return due later items", () => {
    const todos = todoList();
    todos.add({ title: "Later task", dueDate: tomorrow, completed: false });
    expect(todos.dueLater().length).toBe(1);
  });
  