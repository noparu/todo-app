export const slugify = (value: string) => {
    return value.trim()
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w\-]+/g, '')
              .replace(/\-\-+/g, '-')
              .replace(/^-+/, '')
              .replace(/-+$/, '')  
}

export const addToLocalStorage = (item: any) => {
    return new Promise((resolve, reject) => {
    // Ambil data dari localStorage
    const tasks = localStorage.getItem('tasks');
    let tasks2 = tasks ? JSON.parse(tasks) : [];

    // Tentukan id baru dengan mencari id terbesar saat ini
    let maxId = tasks2.length > 0 ? Math.max(...tasks2.map((task: any) => task.id)) : 0;
    item.id = maxId + 1;

    // Tambahkan item baru ke dalam array tasks2
    tasks2.push(item);

    // Simpan kembali array tasks2 ke localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks2));
    console.log('Item successfully added to local storage:', item);
    resolve(item); // Menyelesaikan Promise dengan item yang ditambahkan
    });
};
