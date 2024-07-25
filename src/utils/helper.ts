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

// Function to handle editing a task
export const editToLocalStorage = (item: any) => {
    try {
        // Ambil data dari localStorage
        const tasksJSON = localStorage.getItem('tasks');
        if (!tasksJSON) {
            console.error('No tasks found in local storage.');
            return;
        }
        
        // Parse data JSON menjadi array tasks
        let tasks = JSON.parse(tasksJSON);

        // Cari index dari task yang memiliki id sesuai dengan taskId
        const taskIndex = tasks.findIndex((task: any) => task.id === item?.id);

        // Jika task dengan id yang sesuai ditemukan
        if (taskIndex !== -1) {
            // Ganti data task pada index yang ditemukan dengan formattedTask
            tasks[taskIndex] = {
                ...item,
                id: item?.id, // Pastikan id tetap sama dengan taskId yang diberikan
                created_at: tasks[taskIndex].created_at // Jaga agar created_at tetap sama dengan yang ada di localStorage
            };

            // Simpan kembali array tasks ke localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
            console.log(`Task with ID ${item?.id} successfully updated.`);

            // Contoh: jika ingin melakukan navigasi setelah berhasil diubah
            // router.push('/'); // Pastikan menggunakan router dari Next.js atau framework yang sesuai
        } else {
            console.error(`Task with ID ${item?.id} not found.`);
        }
    } catch (error) {
        console.error('Error editing task:', error);
    }
};

export const deleteFromLocalStorage = (item: any) => {
    try {
        // Ambil data dari localStorage
        const tasksJSON = localStorage.getItem('tasks');
        if (!tasksJSON) {
            console.error('No tasks found in local storage.');
            return;
        }
        
        // Parse data JSON menjadi array tasks
        let tasks = JSON.parse(tasksJSON);

        // Filter tasks untuk menghapus task dengan id yang sesuai
        tasks = tasks.filter((task: any) => task.id !== item?.id);

        // Simpan kembali array tasks yang sudah diubah ke localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(`Task with ID ${item?.id} successfully deleted.`);

        // Contoh: jika ingin melakukan navigasi setelah berhasil dihapus
        // router.push('/'); // Pastikan menggunakan router dari Next.js atau framework yang sesuai
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};