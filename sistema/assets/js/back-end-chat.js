 (() => {
    // Datos mock de chats
    const chats = [
      {
        id: 'chat1',
        name: 'Equipo Marketing',
        status: 'Disponible',
        newMessages: 2,
        messages: [
          {text: 'Hola equipo, ¿listos para la reunión?', sender: 'other'},
          {text: 'Sí, voy en camino.', sender: 'user'},
          {text: 'Cuanto tiempo para que llegue?', sender: 'other'},
          {text: 'Voy por ruta 64, a unos 7 minutos', sender: 'user'},
        ]
      },
      {
        id: 'chat2',
        name: 'Soporte Técnico',
        status: 'Ocupado',
        newMessages: 1,
        messages: [
          {text: '¿Alguna novedad con el servidor?', sender: 'other'},
          {text: 'No se tiene novedades, ya se resolvio el problema por si mismo', sender: 'user'},
          {text: 'Acuso recibo, gracias', sender: 'other'},
        ]
      },
      {
        id: 'chat3',
        name: 'Desarrollo',
        status: 'Ausente',
        newMessages: 1,
        messages: [
              {text: 'Desarrollo web y sistemas gestionados por Patricio Varela C.', sender: 'other'},
        ]
      }
    ];

    let currentChatId = null;
    let collapsed = false;
    let contactsVisible = false;

    // Elementos
    const chatList = document.getElementById('chatList');
    const chatTitle = document.getElementById('chatTitle');
    const messagesContainer = document.getElementById('messagesContainer');
    const noMessagesNotice = document.getElementById('noMessagesNotice');
    const contactsList = document.getElementById('contactsList');
    const toggleCollapseBtn = document.getElementById('toggleCollapseBtn');
    const toggleContactsBtn = document.getElementById('toggleContactsBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = chatForm.querySelector('button[type="submit"]');
    const totalNewMsgBadge = document.getElementById('totalNewMsgBadge');

    // Renderizar lista de chats
    function renderChatList() {
      chatList.innerHTML = '';
      chats.forEach(chat => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.style.cursor = 'pointer';
        li.dataset.chatId = chat.id;

        li.innerHTML = `
          <div>
            <strong>${chat.name}</strong><br />
            <small class="text-muted">${chat.status}</small>
          </div>
          ${chat.newMessages > 0 ? `<span class="badge bg-primary rounded-pill">${chat.newMessages}</span>` : ''}
        `;
        if (chat.id === currentChatId) li.classList.add('active');

        li.addEventListener('click', () => {
          if(currentChatId !== chat.id) {
            switchChat(chat.id);
          }
        });

        chatList.appendChild(li);
      });
    }

    // Actualizar el badge total de mensajes nuevos
    function updateTotalNewMessages() {
      const total = chats.reduce((acc, c) => acc + c.newMessages, 0);
      totalNewMsgBadge.textContent = total;
      totalNewMsgBadge.style.display = total > 0 ? '' : 'none';
    }

    // Cambiar chat activo
    function switchChat(chatId) {
      currentChatId = chatId;
      const chat = chats.find(c => c.id === chatId);

      // Actualizar título
      chatTitle.textContent = chat.name;

      // Habilitar input
      messageInput.disabled = false;
      sendBtn.disabled = false;

      // Mostrar mensajes
      messagesContainer.innerHTML = '';
      if (chat.messages.length === 0) {
        noMessagesNotice.style.display = '';
      } else {
        noMessagesNotice.style.display = 'none';
        chat.messages.forEach(m => {
          addMessageToContainer(m.text, m.sender === 'user');
        });
      }

      // Reset nuevo mensajes a 0 y actualizar lista y total
      chat.newMessages = 0;
      renderChatList();
      updateTotalNewMessages();

      // Ocultar contactos si visibles
      if (contactsVisible) toggleContacts();
    }

    // Añadir mensaje a la ventana de mensajes
    function addMessageToContainer(text, isUser) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'mb-2 p-2 rounded';
      msgDiv.style.maxWidth = '75%';
      msgDiv.style.wordWrap = 'break-word';
      msgDiv.style.whiteSpace = 'pre-wrap';
      msgDiv.textContent = text;

      if (isUser) {
        msgDiv.classList.add('bg-primary', 'text-white', 'ms-auto');
      } else {
        msgDiv.classList.add('bg-light', 'text-dark', 'border', 'me-auto');
      }
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Enviar mensaje
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!currentChatId) return;

      const text = messageInput.value.trim();
      if (!text) return;

      // Agregar mensaje usuario
      addMessageToContainer(text, true);

      // Guardar en el chat activo
      const chat = chats.find(c => c.id === currentChatId);
      chat.messages.push({text, sender: 'user'});

      messageInput.value = '';

      // Simular respuesta automática tras 1.5 segundos
      setTimeout(() => {
        const reply = "Respuesta automática: Gracias por tu mensaje, estamos revisando.";
        addMessageToContainer(reply, false);
        chat.messages.push({text: reply, sender: 'other'});

        // Actualizar notificaciones para chats no activos
        chats.forEach(c => {
          if(c.id !== currentChatId){
            c.newMessages++;
          }
        });
        renderChatList();
        updateTotalNewMessages();
      }, 1500);
    });

    // Toggle colapsar chat
    toggleCollapseBtn.addEventListener('click', () => {
      collapsed = !collapsed;
      if(collapsed){
        document.getElementById('chatBody').style.display = 'none';
        chatForm.style.display = 'none';
        toggleCollapseBtn.innerHTML = '<i class="bi bi-plus-lg"></i>';
      } else {
        document.getElementById('chatBody').style.display = 'flex';
        chatForm.style.display = 'block';
        toggleCollapseBtn.innerHTML = '<i class="bi bi-dash-lg"></i>';
      }
    });

    // Toggle mostrar contactos
    toggleContactsBtn.addEventListener('click', () => {
      contactsVisible = !contactsVisible;
      if(contactsVisible){
        contactsList.style.display = 'block';
        messagesContainer.style.display = 'none';
      } else {
        contactsList.style.display = 'none';
        messagesContainer.style.display = 'block';
      }
    });

    // Cerrar chat (solo oculta todo)
    closeChatBtn.addEventListener('click', () => {
      const card = closeChatBtn.closest('.card');
      card.style.display = 'none';
    });

    // Inicialización
    renderChatList();
    updateTotalNewMessages();
  })();