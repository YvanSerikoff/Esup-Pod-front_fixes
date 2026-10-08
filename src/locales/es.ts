import type { TranslationKeys } from "./fr";

export const es: TranslationKeys = {
  // === Commun ===
  common: {
    // Common words
    title: "Título",
    description: "Descripción",

    // Actions
    close: "Cerrar",
    save: "Guardar",
    cancel: "Cancelar",
    back: "Atrás",
    update: "Actualizar",
    delete: "Eliminar",
    edit: "Editar",
    add: "Añadir",
    adding: "Añadiendo…",
    addVideo: "Añadir un vídeo",
    search: "Buscar",
    selectAll: "Seleccionar todo",
    stayOnPage: "Permanecer en la página",
    leaveWithoutSaving: "Salir sin guardar",

    // Status & connection
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    connected: "Conectado",
    disconnected: "Desconectado",
    loading: "Cargando…",
    error: "Se ha producido un error",

    // Navigation
    home: "Inicio",
    selectionReturn: "Volver a la selección",
    goToMainContent: "Ir al contenido principal",
    backToHomepage: "Volver a la página de inicio",
    tab: "Panel de control",
    commingSoon: "Próximamente",

    // Entities (singular / plural)
    video: "Vídeo",
    videos: "Vídeos",
    pluralVideos: "{count, plural, one {# vídeo} other {# vídeos}}",
    collection: "Colección",
    collections: "Colecciones",
    countedCollections: "{count, plural, one {colección} other {colecciones}}",
    channel: "Canal",
    channels: "Canales",
    countedChannels: "{count, plural, one {canal} other {canales}}",
    playlist: "Lista de reproducción",
    playlists: "Listas de reproducción",
    countedPlaylists:
      "{count, plural, one {lista de reproducción} other {listas de reproducción}}",
    playlistStatus: "Estado de la lista de reproducción",
    unknown: "Desconocido",
    theme: "Tema",
    themes: "Temas",
    countedThemes: "{count, plural, one {tema} other {temas}}",
    subtopic: "Subtema",
    subtopics: "Subtemas",
    discipline: "Disciplina",
    disciplines: "Disciplinas",
    series: "Serie / Programa",
    allVideos: "Todos los vídeos",
    direct: "Directo",
    directs: "Directos",
    views: "{count, plural, one {# visualización} other {# visualizaciones}}",

    // Display, search & pagination
    displayMode: "Visualización:",
    viewCards: "Tarjetas",
    viewTable: "Tabla",
    videosFound: "vídeo(s) encontrado(s)",
    found: "{count, plural, one {Encontrado} other {Encontrados}}",
    noResults: "No hay resultados para tu búsqueda",
    paginationInfo:
      "Mostrando del {start} al {end} de {count, plural, one {# vídeo{pageInfo}} other {# vídeos{pageInfo}}}",
    paginationPage: " (Página {page} de {pagesCount})",
    opacity: "Opacidad",

    // Metadata
    createdBy: "Creado por",
    latestUpdate: "Actualizado el:",
    contributors: "Colaboradores y participantes",
    addContributorsDesc:
      "Añade autores, realizadores o participantes a tu vídeo.",
    infos: "Información",
    configBase: "Configura los ajustes básicos",

    // Visibility
    public: "Público",
    private: "Privado",
    passwordProtected:
      "Has activado la protección mediante contraseña. Introduce una contraseña.",

    // Validation & confirmations
    titleRequired: "El título es obligatorio",
    descRequired: "La descripción es obligatoria.",
    permanentAction: "Esta acción es permanente.",
    unsavedChangesLeaveConfirmation:
      "Tienes cambios sin guardar. ¿Seguro que quieres salir de esta página?",
    unsavedChangesTitle: "Cambios sin guardar",

    // Miscellaneous
    recently: "Recientemente",
    default: "Predeterminado",

    collectionCountLabel:
      "{count, plural, one {# {label} encontrado} other {# {label} encontrados}}",
  },

  errors: {
    // General
    error: "Se ha producido un error",
    update: "Se ha producido un error al actualizar",
    save: "Error al guardar",
    create: "Error al crear",
    loadError: "Error de carga",
    loadConfig: "Error al cargar la configuración",
    loadInfo: "Error al cargar la información",
    notFound: "Página no encontrada",
    notFoundDesc: "La página que buscas no existe o ha sido eliminada.",
    serverError: "Error del servidor",
    serverErrorDesc:
      "Se ha producido un error en el servidor. Inténtalo de nuevo más tarde.",
    notConnected: "Usuario no conectado",
    error401: "Acceso no autorizado (401). Inicia sesión.",
    notConfigured:
      "La página solicitada no existe o todavía no ha sido configurada para este establecimiento.",
    formFieldsError:
      "{count, plural, =1 {Corrige el siguiente campo: {fields}.} other {Corrige los siguientes # campos: {fields}.}}",
    savingFormError: "Error al guardar el formulario",
    accessDenied: "No tienes acceso a esta página",

    // Videos
    loadErrorVideo: "Error al cargar el vídeo",
    loadErrorVideos: "Error al cargar los vídeos {status}.",
    deleteErrorVideo: "Se ha producido un error al eliminar el vídeo",
    dupErrorVideo: "Se ha producido un error al duplicar el vídeo",

    // Images
    chooseImage: "Selecciona una imagen",
    imageSendError: "Error al subir la imagen",
    imageDeleteError: "Error al eliminar la imagen",

    // Pages & sections
    loadPage: "Error al cargar la página",
    getBlocks: "Error al obtener los bloques de diseño.",
    unableToSection: "No se puede cargar esta sección de la aplicación",
    unableToTheme: "No se puede cargar este tema.",

    // Channels & themes
    getChannels:
      "Error al obtener {count, plural, one {el canal} other {los canales}}",
    getThemeError:
      "Error al obtener {count, plural, one {el tema} other {los temas}}",

    // Keywords
    tagsLoadError: "Error al cargar las palabras clave: {error}",
    noKeywords: "No hay palabras clave disponibles por el momento.",

    // Subtitles
    addSubtitleError: "Error al añadir el subtítulo",
    deleteSubtitleError: "Error al eliminar el subtítulo",

    // Playlists
    loadPlaylist:
      "Error al cargar {count, plural, one {la lista de reproducción} other {las listas de reproducción}}.",
    updatePlaylist: "Error al modificar la lista de reproducción",
    deletePlaylist: "Error al eliminar la lista de reproducción",
    addVideoToPlaylist: "Error al añadir el vídeo a la lista de reproducción",
    deleteVideoFromPlaylist:
      "Error al retirar el vídeo de la lista de reproducción",

    // Favorites
    loadFavorites: "Error al cargar los favoritos",
    addFavorite: "Error al añadir el vídeo a favoritos",
    deleteFavorite: "Error al eliminar el vídeo de favoritos",

    // Comments & votes
    loadComments: "Error al cargar los comentarios",
    addComment: "Error al añadir el comentario",
    deleteComment: "Error al eliminar el comentario",
    addVote: "Error al añadir el voto",

    // Chapters
    loadChapters: "Error al cargar los capítulos",
    addChapter: "Error al añadir el capítulo",
    deleteChapter: "Error al eliminar el capítulo",
  },

  pending: {
    sending: "Enviando…",
    deleting: "Eliminando…",
    updating: "Actualizando…",
    loading: "Cargando…",
    encoding: "Codificando…",
    processing: "Procesando…",
    saving: "Guardando…",
    publishing: "Publicando…",
  },

  providers: {
    // Context hooks
    auth: "useAuth debe utilizarse dentro de AuthProvider.",
    sidebar: "useSidebar debe utilizarse dentro de SidebarProvider.",
    playlistCreation:
      "usePlaylistCreationContext debe utilizarse dentro de PlaylistCreationProvider.",
    cunninghamTheme:
      "useCunninghamTheme debe utilizarse dentro de CunninghamStyleProvider.",

    // Errors
    getChannels:
      "Error al obtener {count, plural, one {el canal} other {los canales}}",
  },

  a11y: {
    // Logos
    institutionLogo: "Logotipo de la institución",
    homeLogo: "Logotipo de Esup-Pod, volver a la página de inicio",
    facebookLogo: "Logotipo de Facebook",
    xLogo: "Logotipo de X",
    linkedinLogo: "Logotipo de LinkedIn",
    blueskyLogo: "Logotipo de Bluesky",
    mastodonLogo: "Logotipo de Mastodon",

    // Banners, logos & thumbnails
    channelBanner: "Banner del canal {title}",
    channelLogo: "Logotipo del canal {title}",
    themeBanner: "Banner del tema {title}",
    videoThumbnail: "Miniatura del vídeo {title}",
    collectionThumbnail: "Miniatura de la colección {title}",
    playlistThumbnail: "Miniatura de la lista de reproducción {title}",
    collectionDisplayMode: "Modo de visualización de colecciones",
    thumbnail: "Miniatura",
    preview: "Vista previa",
    watermark: "Marca de agua",

    // Profile picture
    profilePreview: "Vista previa de la foto de perfil",
    currentProfilePicture: "Foto de perfil actual",
    changeProfilePicture: "Cambiar mi foto de perfil",
    deleteProfilePicture: "Eliminar la foto de perfil actual",
    newProfilePictureSuccess: "Foto de perfil actualizada correctamente",
    deleteProfilePictureSuccess: "Foto de perfil eliminada correctamente",
    noProfilePicture: "Todavía no tienes una foto de perfil.",
    chooseImage: "Selecciona una imagen",

    // Video import
    importVideo: "Importar un vídeo",
    chooseFile: "Selecciona un archivo de vídeo",
    chooseVideo: "Seleccionar este vídeo",
    chooseVideoOrAudioFile: "Selecciona un archivo de audio o vídeo",
    supportedFormats: "Formatos compatibles: ",
    fileSizeLimit:
      "El tamaño del archivo debe ser <bold>inferior a {maxSize} GB.</bold>",
    uploadTimeInfo:
      "El tiempo de carga depende del tamaño del archivo y de tu velocidad de subida.",
    uploadWarning:
      "Durante la carga, no cierres el navegador hasta recibir un mensaje de éxito o de error.",
    videoProcessingMessage:
      "Tu vídeo se está procesando. No cierres la página…",
    skipImportCreateEmpty: "Omitir importación (Crear una ficha vacía)",
    createEmptyRecord: "Crear una ficha vacía",
    emptyRecordWarning:
      "Estás a punto de crear una ficha de vídeo sin un archivo multimedia de origen. Podrás añadir el vídeo de origen más adelante desde la etapa <b>«Importación»</b> de la página de edición.",
    clearDescriptiveTitle: "Introduce un título claro y descriptivo.",

    // Terms of use & intellectual property
    termsOfUse: "Condiciones de uso",
    acceptTermsRequired: "Acepta las condiciones de uso.",
    intellectualPropertyWarning:
      "¡Atención! Asegúrate de respetar la legislación sobre propiedad intelectual antes de publicar un vídeo:",
    intellectualPropertyAcknowledgement:
      "Declaro que respeto la legislación sobre propiedad intelectual al publicar mi vídeo.",
    publicationAuthorizations:
      "Confirmo que dispongo de las autorizaciones necesarias firmadas por las partes implicadas en la publicación de este contenido multimedia, incluido el consentimiento relativo al derecho a la imagen y al tratamiento de datos personales. Certifico que todas las personas afectadas han recibido información completa sobre el tratamiento de sus datos personales, de conformidad con los artículos 13 y 14 del RGPD.",

    // Controls & menus
    collectionsDisplayMode: "Modo de visualización de las colecciones",
    videosDisplayMode: "Modo de visualización de los vídeos",
    videoActions: "Acciones del vídeo",
  },

  // === Reference data ===
  languages: {
    fr: "Francés",
    en: "Inglés",
    es: "Español",
  },

  cursus: {
    "0": "Otro",
    L1: "Grado 1",
    L2: "Grado 2",
    L3: "Grado 3",
    M1: "Máster 1",
    M2: "Máster 2",
    D: "Doctorado",
  },

  type: {
    cours: "Curso",
    conference: "Conferencia",
    tutoriel: "Tutorial",
    colloque: "Coloquio",
    seminaire: "Seminario",
    interview: "Entrevista",
    autre: "Otro",
  },

  discipline: {
    informatique: "Informática",
    droit: "Derecho",
    medecine: "Medicina",
    sciences: "Ciencias",
    histoire: "Historia",
    langues: "Idiomas",
  },

  // === Layout ===
  navbar: {
    searchPlaceholder: "Buscar…",
    addVideo: "Añadir un vídeo",
    settings: "Visualización y accesibilidad",
    login: "Iniciar sesión con {serviceName}",
    myProfileImage: "Cambiar mi foto de perfil",
    administration: "Administración",
    openProfileMenu: "Abrir el menú de perfil",
    closeSearch: "Cerrar la búsqueda",
  },

  sidebar: {
    // Navigation
    mainMenu: "Menú principal",
    closeMenu: "Cerrar el menú",
    browseVideos: "Explorar vídeos",
    mySpace: "Mi espacio",
    dashboard: "Mi panel de control",
    myFavorites: "Mis vídeos favoritos",
    favorites: "Vídeos favoritos",
    myPlaylists: "Mis listas de reproducción",
    playlists: "Reproducción de la lista",
    videoBranding: "Diseños y marcas de agua",

    // Home & playback
    welcome: "Bienvenido",
    welcomeUser: "¡Bienvenido, {name}!",
    nowPlaying: "Reproduciendo",
  },

  footer: {
    legalNotice: "Aviso legal",
    accessibilityPartially: "Accesibilidad: Parcialmente conforme",
    siteMap: "Mapa del sitio",
    esupProject: "Proyecto Esup-Pod",
    esupPortal: "Portal Esup",
    videoPlatform: "Plataforma de vídeo",
  },

  // === Pages & features ===
  home: {
    welcomeSubtitle: "¡Bienvenido a tu plataforma POD!",
    welcomeIntro:
      "El vídeo es un medio excelente para comunicar, enseñar y aprender. Estos son algunos usos que podrían interesarte.",
    howToTitle: "¿Cómo hacerlo?",
    howToDescPrefix: "¿Quieres publicar tus propios contenidos? Esta ",
    quickGuideLink: "guía rápida de uso",
    howToDescSuffix: " te presentará las funciones básicas de Pod.",
    btnUsePod: "Usar Pod",
    btnHowTo: "Cómo hacerlo",
    btnCopyright: "Derechos de autor",
    latestVideos: "Últimos vídeos publicados",
    btnAllVideos: "Mostrar todos los vídeos",
    videoServiceError: "El servicio de vídeo no está disponible temporalmente",
    noRecentVideos: "No hay vídeos públicos recientes",
  },

  auth: {
    loginTitle: "Iniciar sesión en mi perfil de POD",
    loginRequired: "Debes iniciar sesión para acceder a esta página.",
    username: "Nombre de usuario",
    usernameRequired: "El nombre de usuario es obligatorio",
    password: "Contraseña",
    passwordRequired: "La contraseña es obligatoria",
    submitLogin: "Iniciar sesión",
    unknownUser: "Usuario desconocido",
    passwordMinLength: "La contraseña debe contener al menos {min} caracteres.",
    loginSuccess: "Has iniciado sesión correctamente.",
    logoutSuccess: "Has cerrado sesión correctamente.",
  },

  webtv: {
    webtv: "WebTV",
    liveTitle: "Directo",
    noLive: "No hay ningún directo en curso",
    loadingContent: "Cargando contenidos de WebTV…",
    noContent: "No hay contenido disponible",
    climateActu: "Actualidad: Clima",
    seriesEmission: "Series / Programas",
    actuCollections: "Colecciones de actualidad",
    latestCollections: "Últimas colecciones",
    mostViewed: "Vídeos más vistos",
    searchContent: "Buscar contenidos",
  },

  blocks: {
    // Collections block
    collectionTitle: "Bloque general de colecciones",
    collectionDescription:
      "Muestra una selección configurable de colecciones (canales, temas, listas de reproducción).",
    collectionTypeLabel: "Tipo de colección que se mostrará",
    collectionTypeChannels: "Canales",
    collectionTypeThemes: "Temas (Categorías)",
    collectionTypeAll: "Todas las colecciones",
    collectionIdsLabel:
      "Identificadores o Slugs de las colecciones que se mostrarán (separados por comas)",
    collectionSortCreated: "Fecha de creación (Más recientes)",

    // Custom text block
    customTextDescription: "Muestra un párrafo o contenido personalizado.",
    customTextContentLabel: "Contenido de texto o HTML",

    // Live streams block
    liveDescription:
      "Muestra la lista de directos en curso con un indicador rojo activo.",
    liveSortLabel: "Orden de los directos",
    liveSortStartUpcoming: "Fecha de inicio (Próximos)",
    liveSortStartRecent: "Fecha de inicio (Recientes)",
    liveSortPopularity: "Popularidad (Número de espectadores)",

    // Video grid block
    videoGridTitle: "Bloque de cuadrícula de vídeos",
    videoGridDescription:
      "Muestra una fila o cuadrícula configurable de tarjetas de vídeo.",
    videoGridSortLabel: "Orden de los vídeos",
    videoGridSortLatest: "Añadidos recientemente",
  },

  preferences: {
    settingsHeader: "Configuración",
    title: "Visualización y accesibilidad",
    dressing: "Marcas de agua",
    languageSectionTitle: "Idioma de la aplicación",
    languageSelectLabel: "Elige el idioma de la interfaz:",
    themeSectionTitle: "Tema visual",
    darkModeLabel: "Modo oscuro",
    lightModeLabel: "Modo claro",
  },

  filters: {
    // Search
    searchPlaceholder: "Buscar un vídeo…",
    search: "Búsqueda",
    advancedFilters: "Filtros avanzados",
    showResults: "Mostrar",
    clearFilters: "Borrar filtros",

    // Criteria
    author: "Autor",
    types: "Tipos",
    cursus: "Nivel de estudios",
    keywords: "Palabras clave",

    // Sorting
    sort: "Ordenar",
    newest: "Más recientes",
    oldest: "Más antiguos",
    titleAZ: "Título A-Z",
    titleZA: "Título Z-A",

    // Dates
    creationDate: "Fecha de creación",
    activeCreationDate: "Fecha (filtro activo)",
    selectPeriod: "Selecciona un período",
    createdAfter: "Creado después de",
    createdBefore: "Creado antes de",
  },

  bulk: {
    // General
    title: "Edición masiva",
    checkVideosPrompt: "Selecciona vídeos para activar las acciones",
    chooseAction: "Elegir una acción…",
    deselectAll: "Deseleccionar todo",
    modalTitle: "Edición masiva: {action}",
    newValueFor: "Nuevo valor para: {label}",
    affectedVideos: "Vídeos afectados ({count})",
    confirmEdit: "Confirmar cambios",
    unavailableForSelection: "No disponible para esta selección",
    encodingInProgressTooltip:
      "Algunos vídeos se están codificando. Las acciones que requieren una codificación completa están desactivadas.",
    encodingWarning:
      "Atención: algunos vídeos se están codificando actualmente.",
    errorBadge: "❌ Error",
    examplePlaceholder: "ej.: curso, informática, Python",

    // Editing
    editGroup: "MODIFICAR LOS VÍDEOS",
    changeType: "Cambiar el tipo",
    changeChannel: "Cambiar el canal",
    editDescription: "Modificar la descripción",
    changeLicense: "Cambiar la licencia",
    setEventDate: "Definir la fecha del evento",
    addReplaceKeywords: "Añadir / Reemplazar palabras clave",
    changeDiscipline: "Cambiar la disciplina",
    changeCursus: "Cambiar el nivel de estudios",
    keywordsHelper:
      "Separa las palabras clave con comas. Sustituirán las palabras clave existentes.",
    noChannel: "-- Ningún canal (eliminar de todos los canales) --",
    chooseType: "-- Elegir un tipo --",
    chooseStatus: "-- Elegir el estado --",
    choose: "-- Elegir --",
    chooseLicense: "-- Elegir una licencia --",
    chooseDiscipline: "-- Elegir una disciplina --",
    chooseLevel: "-- Elegir el nivel --",
    deletedSuccessfully:
      "{count, plural, one {# vídeo eliminado correctamente.} other {# vídeos eliminados correctamente.}}",
    updatedSuccessfully:
      "{count, plural, one {# vídeo actualizado correctamente.} other {# vídeos actualizados correctamente.}}",

    // Visibility & options
    publishUnpublish: "Publicar / Despublicar",
    restrictAuth: "Restringir a miembros conectados",
    allowDownloading: "Permitir / Prohibir la descarga",
    disableComments: "Activar / Desactivar los comentarios",
    scheduleDeletion: "Programar una eliminación automática",
    scheduleDeletionNotice:
      "El vídeo se eliminará automáticamente en la fecha seleccionada.",

    // Deletion
    dangerZone: "ZONA DE PELIGRO",
    deleteSelected: "Eliminar los vídeos seleccionados",
    confirmDelete: "Confirmar la eliminación",
    deleteWarning:
      "Estás a punto de eliminar permanentemente los vídeos seleccionados.",
    deleteVideosWarning:
      "Vas a eliminar permanentemente <strong>{count, plural, one {# vídeo} other {# vídeos}}</strong>. Esta acción es <strong>irreversible</strong>.<encoding>⚠️ Atención: algunos vídeos se están codificando actualmente.</encoding>",
    deletePermanently: "Eliminar permanentemente",

    // Licenses
    licenseCopyright: "Copyright / Todos los derechos reservados",
    licenseCcByNcSa: "CC BY-NC-SA — Compartir igual, uso no comercial",
    licenseCcBySa: "CC BY-SA — Compartir igual",
    licenseCcBy: "CC BY — Atribución",
    licenseCcByNc: "CC BY-NC — Uso no comercial",
    licenseCcByNcNd: "CC BY-NC-ND — Sin obras derivadas, uso no comercial",
    licenseCcByNd: "CC BY-ND — Sin obras derivadas",
    licenseCc0: "Dominio público (CC0)",

    // Value options
    optionPublic: "🌐 Público — visible para todos",
    optionPrivate: "🔒 Privado — borrador, no visible",
    optionRestricted: "🔗 Restringido — se requiere un enlace",
    optionAuthYes: "✅ Sí — es necesario iniciar sesión para acceder",
    optionAuthNo: "🌐 No — accesible sin iniciar sesión",
    optionDownloadYes: "⬇️ Sí — permitir la descarga",
    optionDownloadNo: "🚫 No — desactivar la descarga",
    optionCommentsOn: "💬 Activar los comentarios",
    optionCommentsOff: "🚫 Desactivar los comentarios",

    // Feedback
    deleteSuccess:
      "{count, plural, one {# vídeo eliminado} other {# vídeos eliminados}} correctamente.",
    updateSuccess:
      "{count, plural, one {# vídeo actualizado} other {# vídeos actualizados}} correctamente.",
    actionError: "Se ha producido un error al ejecutar la acción masiva.",
    errorPublishNotEncoded:
      "No se puede continuar: uno o varios vídeos seleccionados todavía no han terminado de codificarse. Espera a que termine la codificación antes de cambiar el estado de publicación.",
    errorRestrictNotEncoded:
      "No se puede continuar: las restricciones de acceso solo pueden configurarse en vídeos completamente codificados.",
    errorDownloadNotEncoded:
      "No se puede continuar: la descarga solo puede configurarse para vídeos codificados.",
    errorCommentsNotEncoded:
      "No se puede continuar: la configuración de comentarios solo se aplica a vídeos codificados.",
  },

  table: {
    // Columns
    title: "Título",
    duration: "Duración",
    dateAdded: "Fecha de adición",
    status: "Estado",

    // Visibility
    public: "Público",
    restricted: "Restringido",
    password: "Contraseña",
    privateVideo: "Vídeo privado",
    passwordProtectedVideo: "Vídeo protegido por contraseña",

    // Encoding states
    pendingEncoding: "Vídeo pendiente de codificación",
    encodingCompleted: "Codificación completada",
    encodingError: "Error de codificación",

    // Results
    noVideosFound: "No se han encontrado vídeos.",
  },

  videoAction: {
    edit: "Editar vídeo",
    duplicate: "Duplicar",
    duplicating: "Duplicando…",
    delete: "Eliminar vídeo",
    deleteConfirm: "¿Seguro que quieres eliminar el vídeo «{title}»?",
  },

  videoPlayer: {
    unableToLoad: "No se puede cargar el vídeo.",
    unableToDownload: "No se puede descargar el vídeo.",
    encodingInProgress: "El vídeo se está codificando…",
    retry: "Reintentar",
  },

  videoDressing: {
    // Branding
    dressing: "Diseño del vídeo",
    title: "Título del diseño",
    unique: "Nombre único para identificar el diseño",
    loading: "Cargando el diseño…",
    noDressing: "No hay ningún diseño disponible por el momento.",
    noConfig: "Ningún elemento configurado",

    // Elements
    watermark: "Marca de agua",
    opacity: "Opacidad",
    start: "Introducción",
    end: "Cierre",
    addWatermark:
      "Para añadir una marca de agua o una introducción/cierre, crea un nuevo diseño y después edítalo.",

    // Actions & feedback
    create: "Crear un nuevo diseño",
    creation: "Creando…",
    successCreate: "Diseño aplicado correctamente",
    errorUpdate: "Error al actualizar el diseño",
  },

  videoPage: {
    // Actions
    back: "Atrás",
    share: "Compartir",
    playlist: "Lista de reproducción",
    favorite: "Favorito",
    report: "Notificar",
    editVideo: "Editar vídeo",
    addToPlaylist: "Añadir a una lista de reproducción",
    copyLink: "Copiar enlace",
    linkCopied: "¡Enlace copiado!",
    seeMore: "Ver más",
    seeLess: "Ver menos",
    download: "Descargar",
    chooseQuality: "Elegir calidad:",
    shareOn: "Compartir en {network}",

    // Information
    about: "Acerca de",
    type: "Tipo",
    channel: "Canal",
    channelWithId: "Canal {id}",
    creator: "Creador",
    mainLanguage: "Idioma principal",
    keywords: "Palabras clave",
    keywordsloading: "Cargando palabras clave…",
    discipline: "Disciplina(s)",
    contributors: "Participantes",
    license: "Licencia",
    cursus: "Nivel de estudios",
    eventDate: "Fecha del evento",
    resources: "Recursos",
    updatedAt: "Actualizado el:",
    views: "visualizaciones",
    none: "Ninguno",

    // States & messages
    notFound: "Vídeo no encontrado.",
    noPlaylistsAvailable: "No hay listas de reproducción disponibles",
    protectedByPassword: "Este vídeo está protegido por contraseña.",
    unlock: "Desbloquear el vídeo",
    unlocking: "Desbloqueando…",
    videoAddedToPlaylist: "Vídeo añadido a la lista de reproducción «{title}».",
    videoRemovedFromPlaylist:
      "Vídeo retirado de la lista de reproducción «{title}».",
    videoAddedToFavorites: "Vídeo añadido a tus favoritos.",
    videoRemovedFromFavorites: "Vídeo eliminado de tus favoritos.",
  },

  contributors: {
    // Form
    defaultRole: "Realizador",
    searchLabel: "Buscar un participante…",
    roleLabel: "Rol",
    functionLabel: "Función / Cargo",

    // Messages
    addError:
      "No se puede añadir este participante (¿quizás ya se ha añadido con este rol?)",
    noContributors: "No hay participantes asociados.",
    roles: {
      actor: "Actor",
      author: "Autor",
      consultant: "Consultor",
      contributor: "Colaborador",
      director: "Realizador",
      speaker: "Ponente",
      technician: "Técnico",
      voiceOver: "Voz en off",
    },
  },

  documents: {
    // Form
    addTitle: "Añadir un documento",
    titleLabel: "Título del documento",
    dropzone: "Arrastra y suelta un archivo aquí",
    selectedFile: "Archivo seleccionado:",
    privateLabel:
      "Documento privado (visible únicamente para el propietario y los copropietarios)",
    addBtn: "Añadir documento",

    // List
    loading: "Cargando documentos…",
    addedOn: "{title} - Añadido el {date}",
    private: "Privado",
    noDocuments: "Actualmente no hay documentos asociados a este vídeo.",

    // Messages
    fillTitleAndFile: "Introduce un título y selecciona un archivo.",
    uploadError: "Error al subir el documento.",
    deleteConfirm: "¿Seguro que quieres eliminar este documento?",
    deleteError: "Error al eliminar.",
    loadError: "No se pueden cargar los documentos.",
  },

  chapters: {
    // Adding
    addTitle: "Añadir un capítulo",
    titleLabel: "Título del capítulo",
    titlePlaceholder: "Ej.: Introducción, Demostración, Conclusión…",
    captureMoment: "Capturar este momento",
    captureTooltip: "Copia el tiempo actual en el campo Tiempo",
    timeLabel: "Tiempo",
    empty:
      "No hay capítulos. Reproduce el vídeo y haz clic en <strong>Capturar este momento</strong> para añadir una entrada.",
    countLabel: "Capítulos ({count})",
    addError: "Error al añadir",

    // List
    noChapters:
      "No hay capítulos. Reproduce el vídeo y haz clic en <bold>Capturar este momento</bold> para añadir una entrada.",
    goToMoment: "Haz clic para ir a este momento",
    deleteChapter: "Eliminar este capítulo",

    // Messages
    titleRequired: "Introduce un título.",
    timestampTooLong:
      "La marca de tiempo supera la duración del vídeo ({duration}).",
    playerUnavailable:
      "El reproductor estará disponible cuando finalice la codificación. Puedes introducir las marcas de tiempo manualmente.",
  },

  comments: {
    // List
    title: "Comentarios",
    count: "{count} comentario",
    countPlural: "{count} comentarios",
    noCommentsYet: "Todavía no hay comentarios.",
    disabled: "Los comentarios están desactivados para este vídeo.",
    loginToComment: "Inicia sesión para añadir un comentario.",

    // Input
    addPlaceholder: "Añadir un comentario",
    submit: "Comentar",
    submitting: "Publicando…",
    yourReply: "Tu respuesta",

    // Actions
    reply: "Responder",
    delete: "Eliminar",
    voteForComment: "Votar este comentario",
    liked: "Te gusta este comentario",

    // Replies
    hideReplies: "Ocultar respuestas",
    showReplies: "{count} respuesta",
    showRepliesPlural: "{count} respuestas",
  },

  socialNetworks: {
    unableToLoad: "No se pueden cargar las redes sociales.",
    loading: "Cargando las redes sociales…",
    errorSaveSocial: "Se ha producido un error al guardar la red social.",
    saved: "Red social guardada correctamente.",
    authorizedShare: "Red social autorizada para compartir.",
    choice: "Selecciona una red social",
  },

  videoEdit: {
    // Header & actions
    pageTitle: "Editar el vídeo «{title}»",
    pageTitleDefault: "Editar el vídeo",
    duplicate: "Duplicar",
    save: "Guardar",
    quit: "Salir de la página",
    previous: "Anterior",
    next: "Siguiente",
    requiredFieldsPrompt: "Los campos marcados con un * son obligatorios.",

    // Steps
    stepImport: "Importación",
    stepDetails: "Detalles",
    stepElements: "Elementos del vídeo",
    stepVisibility: "Visibilidad",

    // Stepper & badges
    noSourceFileBadge: "Información: Archivo fuente no importado",
    incompleteBadge: "Incompleto",
    completedBadge: "Completado",
    stepInProgress: "Etapa en curso",
    mediaAttached: "Fuente disponible",
    titleFilled: "Título introducido",
    titleRequired: "Título obligatorio",
    subtitlesAndDocs: "Subtítulos y contenido adicional",
    draftOrPublic: "Borrador, restringido o público",

    // Details step
    titleLabel: "Título",
    titlePlaceholder: "Título del vídeo",
    titleHelper:
      "Un título lo más corto y preciso posible, que refleje el tema principal / contexto de este contenido.",
    descriptionLabel: "Descripción",
    descriptionPlaceholder: "Descripción del vídeo en español",
    descriptionHelper:
      "Describe tu contenido, añade toda la información necesaria y da formato al resultado.",
    mainLanguageLabel: "Idioma principal",
    mainLanguageHelper: "El idioma utilizado principalmente en este contenido.",
    tagsHelper: "Introduce palabras clave separadas por comas.",
    thumbnailLabel: "Miniaturas",
    uploadThumbnailBtn: "+ Importar una miniatura",
    thumbnailDimensionsHint: "JPG o PNG · Recomendado: 1280 × 720 px",
    thumbnailCopyrightHelper:
      "La miniatura debe respetar las normas de la comunidad. Asegúrate de disponer de los derechos de autor adecuados para la imagen.",
    changeBtn: "Cambiar",
    deleteBtn: "Eliminar",
    ownerLabel: "Propietario",
    ownerHelper: "Un superusuario puede cambiar el propietario de un vídeo.",
    coOwnersLabel: "Propietarios adicionales",
    coOwnersHelper:
      "Los propietarios adicionales tendrán los mismos derechos que tú, excepto que no podrán eliminar este contenido.",
    licenseLabel: "Licencia",
    licenseHelper: "Derechos de uso de tu contenido.",
    channelLabel: "Canal",
    channelHelper: "Tienes permisos para asociar este vídeo a un canal.",
    noneOption: "Ninguno",
    themesLabel: "Temas",
    themesHelper:
      "Puedes seleccionar uno o varios temas relacionados con el canal.",
    dateToDeleteLabel: "Fecha de eliminación",
    dateToDeleteHelper: "Fecha programada para la eliminación del vídeo.",
    dateOfEventLabel: "Fecha del evento",
    dateOfEventHelper: "Fecha del evento asociado a este vídeo.",
    publicationDateLabel: "Fecha y hora de publicación programada",
    publicationDateHelper:
      "Define una fecha/hora futura en la que el vídeo se hará público.",
    statusLabel: "Estado del vídeo",
    typeLabel: "Tipo",
    tagsLabel: "Palabras clave",
    cursusLabel: "Nivel de estudios",
    themesPlaceholder: "Selecciona uno o varios temas",

    // Import step
    importHeaderTitle: "Añadir un archivo de vídeo",
    importHeaderSub:
      "Gestiona el vídeo fuente y la codificación de tu contenido multimedia.",
    noSourceWarningTitle: "Ficha vacía sin fuente de vídeo",
    noSourceWarningDesc:
      "Este vídeo todavía no tiene ningún archivo fuente asociado. Puedes completar los metadatos (título, descripción, etc.), pero debes añadir un vídeo a continuación antes de poder publicarlo.",
    publicNoSourceAlert:
      "Has seleccionado el estado Público, pero no se ha importado ningún archivo fuente. La importación es obligatoria para la publicación pública.",
    selectVideoFile:
      "Selecciona un archivo de vídeo desde tu ordenador. Se iniciará automáticamente un nuevo proceso de codificación.",
    addVideoFileBtn: "Añadir el vídeo",

    // Video elements step
    elementsHeaderSub:
      "Enriquece tu vídeo con subtítulos, documentos y participantes.",
    subtitlesTitle: "Subtítulos manuales",
    subtitlesDesc:
      "Añade archivos de subtítulos (.vtt, .srt) en uno o varios idiomas.",
    documentsTitle: "Documentos adjuntos",
    documentsDesc:
      "Asocia archivos PDF, presentaciones u otros documentos descargables.",
    contributorsTitle: "Colaboradores y participantes",
    contributorsDesc: "Añade autores, realizadores o participantes a tu vídeo.",
    chaptersTitle: "Crear capítulos del vídeo",
    chaptersDesc:
      "Divide tu vídeo en capítulos mediante marcadores temporales.",
    dressingTitle: "Aplicar diseño al vídeo",
    dressingDesc: "Aplica un diseño (marca de agua, introducción / cierre).",
    position: "Posición de la marca de agua",
    opacity: "Opacidad de la marca de agua",
    trimTitle: "Recortar el vídeo",
    trimDesc: "Define un punto de inicio y de final para acortar el vídeo.",
    chaptersDialogTitle: "Capítulos del vídeo",

    // Visibility step
    visibilityHeaderSub: "Elige cuándo publicar tu vídeo y quién puede verlo.",
    restrictionsHeader: "Restricciones",
    restrictionsSub:
      "Elige si quieres que tu vídeo sea público, no listado o privado.",
    draftPrivateTitle: "Borrador / Privado",
    draftPrivateDesc:
      "En modo «Borrador / Privado», el contenido no aparece en ningún lugar y nadie más que tú puede verlo.",
    restrictedTitle: "Acceso restringido",
    restrictedDesc:
      "En modo «Acceso restringido», puedes elegir las restricciones del vídeo.",
    publicTitle: "Público",
    publicDesc:
      "En modo «Público», el contenido es visible para todo el mundo.",
    noSourceDraftNotice:
      "Sin archivo fuente, solo se permite el modo Borrador / Privado. Los modos Acceso restringido y Público están desactivados.",
    restrictionOptions: "Opciones de restricción:",
    authRequiredLabel: "Autenticación obligatoria",
    authRequiredHelper: "Limitar el acceso a personas autenticadas.",
    authUserOnly: "Reservado a usuarios autenticados.",
    passwordRequiredLabel: "Contraseña obligatoria",
    passwordLabel: "Contraseña del vídeo",
    diffusionTitle: "Configuración de la difusión",
    allowDownloadLabel: "Permitir la descarga",
    allowDownloadHelper: "Permitir la descarga de tu vídeo.",
    disableCommentsLabel: "Desactivar los comentarios",
    disableCommentsHelper:
      "Desactivar la posibilidad de añadir comentarios a tu vídeo.",
    advancedOptionsTitle: "Opciones avanzadas",
    is360Label: "Es un vídeo de 360°",
    is360Helper: "Activar el reproductor 360° para este vídeo.",
    passwordKeepHelper:
      "Déjalo vacío para no modificar la contraseña existente.",

    // Messages & validation
    fillRequiredFields:
      "Completa los campos obligatorios antes de continuar: {fields}.",
    fillRequiredFieldsStep:
      "Completa los campos obligatorios de la etapa «{step}» antes de continuar: {fields}.",
    restrictedNeedsOption:
      "Para un estado restringido, selecciona al menos una restricción.",
    noPermission: "No tienes permisos para modificar este vídeo.",
    loginRequired: "Debes iniciar sesión para modificar este vídeo.",
    updateSuccess: "¡Vídeo actualizado correctamente!",

    // Subtitles
    addSubtitle: "Añadir un subtítulo",
    activeSubtitleCount: "{count, plural, one {# activo} other {# activos}}",
    noSubtitles: "No se han añadido subtítulos.",
    subtitleDescription:
      "Añade archivos de subtítulos en formato .vtt o .srt. Cada archivo corresponde a un idioma.",
    subtitleLanguageLabel: "Idioma",
    subtitleFileHint: "Selecciona un archivo .vtt o .srt",
    addSubtitleBtn: "Añadir el subtítulo",
    cannotAddSubtitle: "No se puede añadir un subtítulo a este vídeo.",
    selectSubtitleFile: "Selecciona un archivo de subtítulos.",
    privateVideoTooltip: "Vídeo privado",
    passwordProtectedVideoTooltip: "Vídeo protegido por contraseña",
    noSourceForPublic:
      "No se ha importado ningún archivo fuente durante la etapa Importación. La ficha no puede publicarse en modo Público.",
    deleteVideo: "Eliminar el vídeo",
    deleteVideoConfirmPrefix: "¿Está seguro de que desea eliminar el vídeo",

    // Source change
    changeSourceTitle: "Cambiar la fuente del vídeo",
    sourceCurrentLabel: "Fuente actual",
    changeSourceDesc:
      "Sustituye el archivo fuente de este vídeo. Se iniciará un nuevo proceso de codificación.",
    selectNewVideoFile: "Seleccionar un nuevo archivo de vídeo",
    replaceSourceBtn: "Reemplazar la fuente",
    changeSourceError: "Error al cambiar la fuente.",
    sourceUpdated:
      "Fuente de vídeo actualizada. Se ha iniciado la recodificación.",
  },

  favorites: {
    title: "Mis vídeos favoritos",
    startPlaylist: "Iniciar la lista de reproducción",
    noFavorites: "No hay vídeos favoritos por el momento.",
    noMatchingFilters: "Ningún vídeo coincide con tus filtros.",
    favoriteUpdateError:
      "Se ha producido un error al actualizar los favoritos.",
  },

  playlists: {
    // Titles & labels
    myTitle: "Mis listas de reproducción",
    playlists: "Listas de reproducción",
    playlist: "Lista de reproducción",
    nowPlaying: "Reproduciendo",
    notFound: "Lista de reproducción no encontrada.",
    unableToLoad: "No se puede cargar la lista de reproducción",
    backToMyPlaylists: "Volver a mis listas de reproducción",

    // Creation & editing
    addPlaylist: "Añadir una lista de reproducción",
    addThePlaylist: "Añadir la lista de reproducción",
    editPlaylist: "Editar la lista de reproducción",
    editThisPlaylist: "Editar la lista de reproducción: {title}",
    seePlaylist: "Ver la lista de reproducción",
    playlistCreated: "La lista de reproducción se ha creado correctamente.",
    playlistUpdated: "¡Lista de reproducción actualizada correctamente!",
    noPermissionToEditPlaylist:
      "No tienes permisos para modificar esta lista de reproducción.",

    // Deletion
    delete: "Eliminar la lista de reproducción",
    deleteConfirm:
      "¿Seguro que quieres eliminar la lista de reproducción «<bold>{title}</bold>»?",
    deleteSuccess: "La lista de reproducción se ha eliminado correctamente.",

    // Empty lists
    noVideos: "No hay vídeos en esta lista de reproducción",
    noPlaylists: "Todavía no tienes ninguna lista de reproducción.",
    noMatchingFilters:
      "Ninguna lista de reproducción coincide con tus filtros.",
    noPublicPlaylists:
      "No hay listas de reproducción disponibles por el momento.",

    // Errors
    creationError:
      "Se ha producido un error al crear la lista de reproducción.",
    deleteError:
      "Se ha producido un error al eliminar la lista de reproducción.",
    playlistUpdateError:
      "Se ha producido un error al actualizar la lista de reproducción.",

    // Visibility
    passwordProtected: "Lista de reproducción protegida por contraseña",
    private: "Lista de reproducción privada",

    // Form
    titleHelper:
      "Dale a tu lista de reproducción un título corto y descriptivo.",
    descriptionHelper:
      "Describe el contenido y/o el contexto de tu lista de reproducción.",
    accessRestrictions: "Restricciones de acceso",
    protectWithPassword: "Proteger mi lista de reproducción con una contraseña",
    addPassword: "Añadir una contraseña",
    passwordLabel: "Contraseña de la lista de reproducción",
    passwordHelper:
      "Añade una contraseña para acceder a la lista de reproducción.",
    visibleToAll:
      "Tu lista de reproducción será visible para todos los usuarios.",
    visibleToOwner: "Tu lista de reproducción solo será visible para ti.",
    defaultSort: "Ordenación predeterminada",
    defaultSortLabel: "Ordenación predeterminada de los vídeos.",
    defaultSortHelper: "Elige el orden en el que se mostrarán los vídeos.",
    sortNewest: "Más recientes",
    sortOldest: "Más antiguas",
    sortTitleAscending: "A-Z",
    sortTitleDescending: "Z-A",
    publicPlaylist: "Lista de reproducción pública",
  },

  channels: {
    // General
    title: "Canales",
    content: "Contenido del canal",
    unclassified: "Vídeos sin clasificar",

    // Empty lists
    noChannels: "No hay canales disponibles por el momento.",
    noMatchingFilters: "Ningún canal coincide con tus filtros.",
    noContent: "Este canal no tiene vídeos ni temas asociados.",
    noTheme: "Este canal no tiene ningún tema asociado.",
    noThemes: "Ningún tema coincide con tus criterios de búsqueda.",
    noVideos: "Este canal no tiene ningún vídeo asociado.",
  },

  dressingPage: {
    title: "Diseños y marcas de agua de vídeo",
    pageDescription:
      "Gestiona tus marcas de agua y elementos visuales para incrustarlos directamente en tus vídeos.",
    myWatermarks: "Mis marcas de agua",
    addWatermark: "Añadir una marca de agua",
    uploading: "Subiendo…",
    noWatermarks: "Todavía no has subido ninguna marca de agua.",
    deleteConfirm: "¿Seguro que quieres eliminar esta marca de agua?",
    loadError: "Error al cargar las marcas de agua.",
    uploadError: "Error al subir la imagen",
  },

  // === Page metadata ===
  titles: {
    // Page titles
    platform: "Plataforma de vídeo Esup-Pod",
    login: "Inicio de sesión | Esup-Pod",
    video: "Vídeo | Esup-Pod",
    allVideos: "Todos los vídeos - Esup-Pod",
    dashboard: "Panel de control | Esup-Pod",
    playlists: "Listas de reproducción - Esup-Pod",
    loginPage: "Inicio de sesión - Esup-Pod",
  },

  descriptions: {
    platform: "Plataforma de vídeo Esup-Pod",
    dashboard:
      "Gestiona tus vídeos y ajustes desde tu panel de control de Esup-Pod.",
    login:
      "Inicia sesión para acceder a tus vídeos y a tu espacio personal en Esup-Pod.",
    playlists:
      "Descubre y gestiona las listas de reproducción públicas de la plataforma Esup-Pod.",
    videos: "Descubre todos los vídeos públicos de la plataforma Esup-Pod.",
    watchVideo: "Ver el vídeo en Esup-Pod",
    loginPage:
      "Inicia sesión en la plataforma Esup-Pod para gestionar tus vídeos.",
  },
};
