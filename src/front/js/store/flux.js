const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			anuncios: [],
			cesta: [],
			mis_anuncios: [],
			email: localStorage.getItem("email") || null, 
		},
		actions: {

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			crearUsuario: (email, password) => {
				return new Promise((resolve, reject) => {
					fetch(process.env.BACKEND_URL + '/api/signUp', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					})
					.then(response => {
						if (!response.ok) {
							return reject('Error en la solicitud: ' + response.status);  // Rechazamos la promesa en caso de error
						}
						return response.json();
					})
					.then(data => {
						console.log('Datos recibidos:', data);
						resolve(data);  // Resolución exitosa de la promesa
					})
					.catch(error => {
						console.error('Hubo un problema con la solicitud:', error);
						reject(error);  // Rechazamos la promesa con el error capturado
					});
				});
			},
			iniciarSesion: (email, password) => {
				return new Promise((resolve, reject) => {
					fetch(process.env.BACKEND_URL + '/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					})
					.then(response => {
						if (!response.ok) {
							return reject('Error en la solicitud: ' + response.status);
						}
						return response.json();
					})
					.then(data => {
						console.log('Datos recibidos:', data);
						localStorage.setItem("token", data.token); // Guardamos el token en localStorage
						localStorage.setItem("email", email); // Almacena el email en localStorage
						setStore({ email: email }); // Almacena el email en el store
						resolve(data);
					})
					.catch(error => {
						console.error('Hubo un problema con la solicitud:', error);
						reject(error);
					});
				});
			},
			
			// crear un anuncio
			addAnuncio: (marca, kilometros, ano, precio, descripcion) => {
				const token = localStorage.getItem("token");
			
				if (!token) {
					console.error("Token no encontrado, el usuario no está autenticado");
					return;
				}
			
				return fetch(process.env.BACKEND_URL + '/api/anuncios', {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						marca: marca,
						ano: ano,
						kilometros: kilometros,
						precio: precio,
						descripcion: descripcion
					})
				})
				.then(response => {
					if (response == 200) {
						misAnuncios()
					}
					return response.json();
				})
				.then(data => {
					console.log('Anuncio creado:', data);
					
					getActions().misAnuncios()
				})
				.catch(error => {
					console.error('Hubo un problema al crear el anuncio:', error);
				});
			},

			//trae todos los anuncios a home
			getAnuncios : () => {
				fetch(process.env.BACKEND_URL + '/api/anuncios')
				.then(response => response.json())
				.then(data => setStore({anuncios: data}))
				.catch(error => console.log(error))
			},

			//trae anuncios de un usuario vista publica
			misAnuncios: () => {
				const token = localStorage.getItem("token");
			
				if (!token) {
					console.error("Token no encontrado, el usuario no está autenticado");
					return;
				}
			
				fetch(process.env.BACKEND_URL + '/api/mis_anuncios', {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				.then(response => {
					if (!response.ok) {
						throw new Error('Error al obtener los anuncios del usuario: ' + response.status);
					}
					return response.json();
				})
				.then(data => {
					console.log('Anuncios del usuario:', data);
					setStore({ mis_anuncios: data });  // Actualizamos el store con los anuncios del usuario
				})
				.catch(error => {
					console.error('Error al traer los anuncios del usuario:', error);
				});
			},
			
			// trae anuncios que un usuario añade a su cesta desde home
			addCesta: (anuncio) => {
                const store = getStore();
                const existe = store.cesta.find(item => item.id === anuncio.id);
                
                if (existe) {
                    setStore({ cesta: store.cesta.filter(item => item.id !== anuncio.id) });
                } else {
                    setStore({ cesta: [...store.cesta, anuncio] });
                }
			},
			
			//usuario elimina su anuncio de todos los componentes
			eliminarAnuncio: (id) => {
				const token = localStorage.getItem("token");
			
				if (!token) {
					console.error("Token no encontrado, el usuario no está autenticado");
					return;
				}
			
				fetch(`${process.env.BACKEND_URL}/api/anuncios/${id}`, {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				.then(response => {
					if (!response.ok) {
						throw new Error('Error al eliminar el anuncio: ' + response.status);
					}
					return response.json();
				})
				.then(data => {
					console.log('Anuncio eliminado:', data);
			
					// Actualizar el store después de eliminar el anuncio
					const store = getStore();
			
					// Filtrar los anuncios eliminando el que coincide con el ID
					const nuevosMisAnuncios = store.mis_anuncios.filter(anuncio => anuncio.id !== id);
					const nuevosAnuncios = store.anuncios.filter(anuncio => anuncio.id !== id);
					const nuevaCesta = store.cesta.filter(anuncio => anuncio.id !== id);
			
					// Actualizar el store con los nuevos arrays
					setStore({
						mis_anuncios: nuevosMisAnuncios,
						anuncios: nuevosAnuncios,
						cesta: nuevaCesta
					});
				})
				.catch(error => {
					console.error('Error al eliminar el anuncio:', error);
				});
			},
			
			//usuario edita su anuncio y actualiza en todos los componentes
			editarAnuncio: (id, marca, kilometros, ano, precio, descripcion) => {
				const token = localStorage.getItem("token");
				
				if (!token) {
					console.error("Token no encontrado, el usuario no está autenticado");
					return;
				}
			
				fetch(`${process.env.BACKEND_URL}/api/anuncios/${id}`, {
					method: 'PUT',  // Usamos PUT para actualizar completamente el anuncio
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						marca: marca,
						kilometros: kilometros,
						ano: ano,
						precio: precio,
						descripcion: descripcion
					})
				})
				.then(response => {
					if (!response.ok) {
						throw new Error('Error al actualizar el anuncio: ' + response.status);
					}
					return response.json();
				})
				.then(data => {
					console.log('Anuncio actualizado:', data);
			
					// Ahora que el anuncio ha sido actualizado en el backend, actualizamos el store en el frontend
					const store = getStore();
			
					// Actualizar misAnuncios
					const nuevosMisAnuncios = store.mis_anuncios.map(anuncio => {
						if (anuncio.id === id) {
							return { ...anuncio, marca, kilometros, ano, precio, descripcion };
						}
						return anuncio;
					});
			
					// Actualizar anuncios
					const nuevosAnuncios = store.anuncios.map(anuncio => {
						if (anuncio.id === id) {
							return { ...anuncio, marca, kilometros, ano, precio, descripcion };
						}
						return anuncio;
					});
			
					// Actualizar cesta
					const nuevaCesta = store.cesta.map(anuncio => {
						if (anuncio.id === id) {
							return { ...anuncio, marca, kilometros, ano, precio, descripcion };
						}
						return anuncio;
					});
			
					// Actualizamos el store
					setStore({ 
						mis_anuncios: nuevosMisAnuncios, 
						anuncios: nuevosAnuncios, 
						cesta: nuevaCesta 
					});
			
				})
				.catch(error => {
					console.error('Error al actualizar el anuncio:', error);
				});
			},

			

			
			
			
			
		}
	};
};

export default getState;
