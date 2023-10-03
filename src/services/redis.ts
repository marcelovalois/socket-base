// import Redis from 'ioredis';

// // Configurando Redis
// const client = new Redis();

// client.on('connect', () => {
//     console.log("Conectado ao Redis");
// })

// client.on('error', (err) => {
//     console.log(`Erro na conexão ao Redis: ${err}`);
// });


// // Função para adicionar um usuário ao Redis
// const addUser = (userId=1, userData="Hello") => {
//     client.hset(`user:${userId}`, userData, (err, result) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(`Usuário ${userId} adicionado ao Redis`);
//       }
//     });
//   };

//   // Função para obter informações de um usuário pelo ID
//   const getUserById = (userId=1, callback: any) => {
//     client.hgetall(`user:${userId}`, (err, userData) => {
//       if (err) {
//         console.error(err);
//         callback(err, null);
//       } else {
//         callback(null, userData);
//       }
//     });
//   };

// export { addUser, getUserById };

// export default client;
