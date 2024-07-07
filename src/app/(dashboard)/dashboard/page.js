export default function Dashboard() {
  return (
    <div style={{ height: "80vh" }}>
      <h1>Dashboard</h1>
    </div>
  );
}

/* let categories = [
  {
    cat_id: 1,
    cat_name: "Erectile dysfunction",
    parent_id: 0,
  },
  {
    cat_id: 2,
    cat_name: "Baldness",
    parent_id: 0,
  },
  {
    cat_id: 3,
    cat_name: "Contraception",
    parent_id: 0,
  },
  {
    cat_id: 4,
    cat_name: "Mini pill",
    parent_id: 3,
  },
  {
    cat_id: 5,
    cat_name: "Mini pill type 1",
    parent_id: 4,
  },
  {
    cat_id: 6,
    cat_name: "Ed type 1",
    parent_id: 1,
  },
  {
    cat_id: 7,
    cat_name: "Mini pill type 2",
    parent_id: 4,
  },
];

function categorylist(parentId, categories, childrenflag) {
  let filteredCategories = categories.filter(
    (cat) => cat.parent_id == parentId
  );

  if (!filteredCategories) {
    return [];
  }

  if (childrenflag && filteredCategories) {
    return filteredCategories;
  }

  //loop
  filteredCategories.forEach((category) => {
    category.children = [...categorylist(category.cat_id, categories, true)];
    if (category.children) {
      categorylist(category.cat_id, categories);
    }
  });
}
 */
