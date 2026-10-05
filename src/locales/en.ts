import type { TranslationKeys } from "./fr";

export const en: TranslationKeys = {
  // === Commun ===
  common: {
    // Actions
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    back: "Back",
    update: "Update",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    adding: "Adding…",
    addVideo: "Add a video",
    search: "Search",
    selectAll: "Select all",
    stayOnPage: "Stay on page",
    leaveWithoutSaving: "Leave without saving",

    // Status & connection
    login: "Log in",
    logout: "Log out",
    connected: "Connected",
    disconnected: "Disconnected",
    loading: "Loading…",
    error: "An error occurred",

    // Navigation
    home: "Home",
    selectionReturn: "Back to selection",
    goToMainContent: "Go to main content",
    backToHomepage: "Back to homepage",
    tab: "Dashboard",
    commingSoon: "Coming soon",

    // Entities (singular / plural)
    video: "Video",
    videos: "Videos",
    pluralVideos: "{count, plural, one {# video} other {# videos}}",
    collection: "Collection",
    collections: "Collections",
    channel: "Channel",
    channels: "Channels",
    playlist: "Playlist",
    playlists: "Playlists",
    theme: "Theme",
    themes: "Themes",
    subtopic: "Subtopic",
    subtopics: "Subtopics",
    discipline: "Discipline",
    disciplines: "Disciplines",
    series: "Series / Show",
    allVideos: "All videos",
    direct: "Live",
    directs: "Live streams",
    view: "view",
    views: "views",

    // Display, search & pagination
    displayMode: "Display:",
    viewCards: "Cards",
    viewTable: "Table",
    videosFound: "video(s) found",
    found: "{count, plural, one {Found} other {Found}}",
    noResults: "No results for your search",
    paginationInfo:
      "Showing {start} to {end} of {count, plural, one {# video{pageInfo}} other {# videos{pageInfo}}}",
    paginationPage: " (Page {page} of {pagesCount})",
    opacity: "Opacity",

    // Metadata
    createdBy: "Created by",
    latestUpdate: "Updated on:",
    contributors: "Contributors & Speakers",
    addContributorsDesc: "Add authors, directors or speakers to your video.",
    infos: "Information",
    configBase: "Configure the basic settings",

    // Visibility
    public: "Public",
    private: "Private",
    passwordProtected:
      "You have enabled password protection. Please enter a password.",

    // Validation & confirmations
    titleRequired: "The title is required",
    descRequired: "The description is required.",
    permanentAction: "This action is permanent.",
    unsavedChangesLeaveConfirmation:
      "You have unsaved changes. Are you sure you want to leave this page?",
    unsavedChangesTitle: "Unsaved changes",

    // Miscellaneous
    recently: "Recently",
    default: "Default",

    collectionCountLabel:
      "{count, plural, one {# {label} found} other {# {label} found}}",
  },

  errors: {
    // General
    error: "An error occurred",
    update: "An error occurred while updating",
    save: "Error while saving",
    create: "Error while creating",
    loadError: "Loading error",
    loadConfig: "Error while loading the configuration",
    loadInfo: "Error while loading information",
    notFound: "Page not found",
    notFoundDesc:
      "The page you are looking for does not exist or has been deleted.",
    serverError: "Server error",
    serverErrorDesc: "A server-side error occurred. Please try again later.",
    notConnected: "User not logged in",
    error401: "Unauthorized access (401). Please log in.",
    notConfigured:
      "The requested page does not exist or has not yet been configured for this institution.",
    formFieldsError:
      "{count, plural, =1 {Please correct the following field: {fields}.} other {Please correct the following # fields: {fields}.}}",
    savingFormError: "Error while saving the form",
    accessDenied: "You do not have access to this page",

    // Videos
    loadErrorVideo: "Error while loading the video",
    loadErrorVideos: "Error while loading videos {status}.",
    deleteErrorVideo: "An error occurred while deleting the video",
    dupErrorVideo: "An error occurred while duplicating the video",

    // Images
    chooseImage: "Please choose an image",
    imageSendError: "Failed to upload the image",
    imageDeleteError: "Failed to delete the image",

    // Pages & sections
    loadPage: "Error while loading the page",
    getBlocks: "Error while retrieving layout blocks.",
    unableToSection: "Unable to load this application section",
    unableToTheme: "Unable to load this theme.",

    // Channels & themes
    getChannels:
      "Error while retrieving {count, plural, one {the channel} other {the channels}}",
    getThemeError:
      "Error while retrieving {count, plural, one {the theme} other {the themes}}",

    // Keywords
    tagsLoadError: "Error while loading keywords: {error}",
    noKeywords: "No keywords available at the moment.",

    // Subtitles
    addSubtitleError: "Error while adding the subtitle",
    deleteSubtitleError: "Error while deleting the subtitle",

    // Playlists
    loadPlaylist:
      "Error while loading {count, plural, one {the playlist} other {the playlists}}.",
    updatePlaylist: "Error while updating the playlist",
    deletePlaylist: "Error while deleting the playlist",
    addVideoToPlaylist: "Error while adding the video to the playlist",
    deleteVideoFromPlaylist: "Error while removing the video from the playlist",

    // Favorites
    loadFavorites: "Error while loading favorites",
    addFavorite: "Error while adding the video to favorites",
    deleteFavorite: "Error while removing the video from favorites",

    // Comments & votes
    loadComments: "Error while loading comments",
    addComment: "Error while adding the comment",
    deleteComment: "Error while deleting the comment",
    addVote: "Error while adding the vote",

    // Chapters
    loadChapters: "Error while loading chapters",
    addChapter: "Error while adding the chapter",
    deleteChapter: "Error while deleting the chapter",
  },

  pending: {
    sending: "Sending…",
    deleting: "Deleting…",
    updating: "Updating…",
    loading: "Loading…",
    encoding: "Encoding…",
    processing: "Processing…",
    saving: "Saving…",
    publishing: "Publishing…",
  },

  providers: {
    // Context hooks
    auth: "useAuth must be used within AuthProvider.",
    sidebar: "useSidebar must be used within SidebarProvider.",
    playlistCreation:
      "usePlaylistCreationContext must be used within PlaylistCreationProvider.",
    cunninghamTheme:
      "useCunninghamTheme must be used within CunninghamStyleProvider.",

    // Errors
    getChannels:
      "Error while retrieving {count, plural, one {the channel} other {the channels}}",
  },

  a11y: {
    // Logos
    institutionLogo: "Institution logo",
    homeLogo: "Esup-Pod logo, back to homepage",
    facebookLogo: "Facebook logo",
    xLogo: "X logo",
    linkedinLogo: "LinkedIn logo",
    blueskyLogo: "Bluesky logo",
    mastodonLogo: "Mastodon logo",

    // Banners, logos & thumbnails
    channelBanner: "Banner for channel {title}",
    channelLogo: "Logo for channel {title}",
    themeBanner: "Banner for theme {title}",
    videoThumbnail: "Thumbnail for video {title}",
    collectionThumbnail: "Thumbnail for collection {title}",
    playlistThumbnail: "Thumbnail for playlist {title}",
    thumbnail: "Thumbnail",
    preview: "Preview",
    watermark: "Watermark",

    // Profile picture
    profilePreview: "Profile picture preview",
    currentProfilePicture: "Current profile picture",
    changeProfilePicture: "Change my profile picture",
    deleteProfilePicture: "Delete current profile picture",
    newProfilePictureSuccess: "Profile picture updated successfully",
    deleteProfilePictureSuccess: "Profile picture deleted successfully",
    noProfilePicture: "You do not have a profile picture yet.",
    chooseImage: "Please select an image",

    // Video import
    importVideo: "Import a video",
    chooseFile: "Please select a video file",
    chooseVideo: "Select this video",
    chooseVideoOrAudioFile: "Choose an audio or video file",
    supportedFormats: "Supported formats: ",
    fileSizeLimit: "The file size must be <bold>less than {maxSize} GB.</bold>",
    uploadTimeInfo:
      "Upload time depends on the size of your file and your upload speed.",
    uploadWarning:
      "During the upload, do not close your browser until you receive a success or failure message.",
    videoProcessingMessage:
      "Your video is being processed. Do not close the page…",
    skipImportCreateEmpty: "Skip import (Create an empty record)",
    createEmptyRecord: "Create an empty record",
    emptyRecordWarning:
      "You are about to create a video record without a source media file. You can add the source video later from the <b>“Import”</b> step of the editing page.",
    clearDescriptiveTitle: "Enter a clear and descriptive title.",

    // Terms of use & intellectual property
    termsOfUse: "Terms of use",
    acceptTermsRequired: "Please accept the terms of use.",
    intellectualPropertyWarning:
      "Warning! Make sure you comply with intellectual property law before publishing a video:",
    intellectualPropertyAcknowledgement:
      "I certify that I comply with intellectual property law when publishing my video.",
    publicationAuthorizations:
      "I confirm that I have the necessary authorizations signed by the parties concerned by the publication of this media, including consent regarding image rights and the processing of personal data. I certify that all concerned individuals have received complete information regarding the processing of their personal data, in accordance with Articles 13 and 14 of the GDPR.",

    // Controls & menus
    collectionsDisplayMode: "Collections display mode",
    videosDisplayMode: "Videos display mode",
    videoActions: "Video actions",
  },

  // === Reference data ===
  languages: {
    fr: "French",
    en: "English",
    es: "Spanish",
  },

  cursus: {
    "0": "Other",
    L1: "Bachelor's Year 1",
    L2: "Bachelor's Year 2",
    L3: "Bachelor's Year 3",
    M1: "Master's Year 1",
    M2: "Master's Year 2",
    D: "PhD",
  },

  type: {
    cours: "Course",
    conference: "Conference",
    tutoriel: "Tutorial",
    colloque: "Symposium",
    seminaire: "Seminar",
    interview: "Interview",
    autre: "Other",
  },

  discipline: {
    informatique: "Computer Science",
    droit: "Law",
    medecine: "Medicine",
    sciences: "Science",
    histoire: "History",
    langues: "Languages",
  },

  // === Layout ===
  navbar: {
    searchPlaceholder: "Search…",
    addVideo: "Add a video",
    settings: "Display and accessibility",
    login: "Log in",
    myProfileImage: "Change my profile picture",
    administration: "Administration",
    openProfileMenu: "Open profile menu",
    closeSearch: "Close search",
  },

  sidebar: {
    // Navigation
    mainMenu: "Main menu",
    closeMenu: "Close menu",
    browseVideos: "Browse videos",
    mySpace: "My space",
    dashboard: "My dashboard",
    myFavorites: "My favorite videos",
    favorites: "Favorite videos",
    myPlaylists: "My playlists",
    playlists: "Playlist playback",
    videoBranding: "Branding & Watermarks",

    // Home & playback
    welcome: "Welcome",
    welcomeUser: "Welcome {name}!",
    nowPlaying: "Now playing",
  },

  footer: {
    legalNotice: "Legal notice",
    accessibilityPartially: "Accessibility: Partially compliant",
    siteMap: "Sitemap",
    esupProject: "Esup-Pod Project",
    esupPortal: "Esup portal",
    videoPlatform: "Video platform",
  },

  // === Pages & features ===
  home: {
    welcomeSubtitle: "Welcome to your POD platform!",
    welcomeIntro:
      "Video is a great medium for communicating, teaching and learning. Here are some uses that might interest you.",
    howToTitle: "How to?",
    howToDescPrefix: "Would you like to upload your own content? This ",
    quickGuideLink: "quick start guide",
    howToDescSuffix: " will introduce you to the basic features of Pod.",
    btnUsePod: "Use Pod",
    btnHowTo: "How to",
    btnCopyright: "Copyright",
    latestVideos: "Latest published videos",
    btnAllVideos: "Show all videos",
    videoServiceError: "The video service is temporarily unavailable",
    noRecentVideos: "No recent public videos",
  },

  auth: {
    loginTitle: "Log in to my POD profile",
    loginRequired: "You must be logged in to access this page.",
    username: "Username",
    usernameRequired: "Username is required",
    password: "Password",
    passwordRequired: "Password is required",
    submitLogin: "Log in",
    unknownUser: "Unknown user",
    passwordMinLength: "The password must contain at least {min} characters.",
    loginSuccess: "You are now logged in.",
    logoutSuccess: "You are now logged out.",
  },

  webtv: {
    webtv: "WebTV",
    liveTitle: "Live",
    noLive: "No live stream currently",
    loadingContent: "Loading WebTV content…",
    noContent: "No content available",
    climateActu: "News: Climate",
    seriesEmission: "Series / Shows",
    actuCollections: "News collections",
    latestCollections: "Latest collections",
    mostViewed: "Most viewed videos",
    searchContent: "Search content",
  },

  blocks: {
    // Collections block
    collectionTitle: "General collections block",
    collectionDescription:
      "Displays a configurable selection of collections (channels, themes, playlists).",
    collectionTypeLabel: "Collection type to display",
    collectionTypeChannels: "Channels",
    collectionTypeThemes: "Themes (Categories)",
    collectionTypeAll: "All collections",
    collectionIdsLabel: "Collection IDs or slugs to display (comma-separated)",
    collectionSortCreated: "Creation date (Newest)",

    // Custom text block
    customTextDescription: "Displays a paragraph or custom content.",
    customTextContentLabel: "Text or HTML content",

    // Live streams block
    liveDescription:
      "Displays the list of ongoing live streams with an active red indicator.",
    liveSortLabel: "Live stream sorting order",
    liveSortStartUpcoming: "Start date (Upcoming)",
    liveSortStartRecent: "Start date (Recent)",
    liveSortPopularity: "Popularity (Number of viewers)",

    // Video grid block
    videoGridTitle: "Video Grid Block",
    videoGridDescription: "Displays a configurable row or grid of video cards.",
    videoGridSortLabel: "Video sorting order",
    videoGridSortLatest: "Recently added",
  },

  preferences: {
    settingsHeader: "Settings",
    title: "Display and accessibility",
    dressing: "Watermarks",
    languageSectionTitle: "Application language",
    languageSelectLabel: "Choose the interface language:",
    themeSectionTitle: "Visual theme",
    darkModeLabel: "Dark mode",
    lightModeLabel: "Light mode",
  },

  filters: {
    // Search
    searchPlaceholder: "Search for a video…",
    search: "Search",
    advancedFilters: "Advanced filters",
    showResults: "Show",
    clearFilters: "Clear filters",

    // Criteria
    author: "Author",
    types: "Types",
    cursus: "Education level",
    keywords: "Keywords",

    // Sorting
    sort: "Sort",
    newest: "Newest",
    oldest: "Oldest",
    titleAZ: "Title A-Z",
    titleZA: "Title Z-A",

    // Dates
    creationDate: "Creation date",
    activeCreationDate: "Date (active filter)",
    selectPeriod: "Select a period",
    createdAfter: "Created after",
    createdBefore: "Created before",
  },

  bulk: {
    // General
    title: "Bulk edit",
    checkVideosPrompt: "Select videos to enable actions",
    chooseAction: "Choose an action…",
    deselectAll: "Deselect all",
    modalTitle: "Bulk edit: {action}",
    newValueFor: "New value for: {label}",
    affectedVideos: "Affected videos ({count})",
    confirmEdit: "Confirm changes",
    unavailableForSelection: "Not available for this selection",
    encodingInProgressTooltip:
      "Some videos are currently being encoded. Actions requiring completed encoding are disabled.",
    encodingWarning: "Warning: some videos are currently being encoded.",
    errorBadge: "❌ Error",
    examplePlaceholder: "e.g. course, computer science, python",

    // Editing
    editGroup: "EDIT VIDEOS",
    changeType: "Change type",
    changeChannel: "Change channel",
    editDescription: "Edit description",
    changeLicense: "Change license",
    setEventDate: "Set event date",
    addReplaceKeywords: "Add / Replace keywords",
    changeDiscipline: "Change discipline",
    changeCursus: "Change education level",
    keywordsHelper:
      "Separate keywords with commas. They will replace the existing keywords.",
    noChannel: "-- No channel (remove from all channels) --",
    chooseType: "-- Choose a type --",
    chooseStatus: "-- Choose a status --",
    choose: "-- Choose --",
    chooseLicense: "-- Choose a license --",
    chooseDiscipline: "-- Choose a discipline --",
    chooseLevel: "-- Choose a level --",
    deletedSuccessfully:
      "{count, plural, one {# video deleted successfully.} other {# videos deleted successfully.}}",
    updatedSuccessfully:
      "{count, plural, one {# video updated successfully.} other {# videos updated successfully.}}",

    // Visibility & options
    publishUnpublish: "Publish / Unpublish",
    restrictAuth: "Restrict to logged-in members",
    allowDownloading: "Allow / Disable downloading",
    disableComments: "Enable / Disable comments",
    scheduleDeletion: "Schedule automatic deletion",
    scheduleDeletionNotice:
      "The video will be automatically deleted on the selected date.",

    // Deletion
    dangerZone: "DANGER ZONE",
    deleteSelected: "Delete selected videos",
    confirmDelete: "Confirm deletion",
    deleteWarning: "You are about to permanently delete the selected videos.",
    deleteVideosWarning:
      "You are about to permanently delete <strong>{count, plural, one {# video} other {# videos}}</strong>. This action is <strong>irreversible</strong>.<encoding>⚠️ Warning: some videos are currently being encoded.</encoding>",
    deletePermanently: "Delete permanently",

    // Licenses
    licenseCopyright: "Copyright / All rights reserved",
    licenseCcByNcSa: "CC BY-NC-SA — ShareAlike, non-commercial use",
    licenseCcBySa: "CC BY-SA — ShareAlike",

    // Value options
    optionPublic: "🌐 Public — visible to everyone",
    optionPrivate: "🔒 Private — draft, not visible",
    optionRestricted: "🔗 Restricted — link required",
    optionAuthYes: "✅ Yes — login required to access",
    optionAuthNo: "🌐 No — accessible without login",
    optionDownloadYes: "⬇️ Yes — allow downloading",
    optionDownloadNo: "🚫 No — disable downloading",
    optionCommentsOn: "💬 Enable comments",
    optionCommentsOff: "🚫 Disable comments",

    // Feedback
    deleteSuccess:
      "{count, plural, one {# video deleted} other {# videos deleted}} successfully.",
    updateSuccess:
      "{count, plural, one {# video updated} other {# videos updated}} successfully.",
    actionError: "An error occurred while executing the bulk action.",
    errorPublishNotEncoded:
      "Unable to proceed: one or more selected videos have not finished encoding yet. Wait until encoding is complete before changing the publication status.",
    errorRestrictNotEncoded:
      "Unable to proceed: access restrictions can only be set on fully encoded videos.",
    errorDownloadNotEncoded:
      "Unable to proceed: downloading can only be configured for encoded videos.",
    errorCommentsNotEncoded:
      "Unable to proceed: comment settings only apply to encoded videos.",
  },

  table: {
    // Columns
    title: "Title",
    duration: "Duration",
    dateAdded: "Date added",
    status: "Status",

    // Visibility
    public: "Public",
    restricted: "Restricted",
    password: "Password",
    privateVideo: "Private video",
    passwordProtectedVideo: "Password-protected video",

    // Encoding states
    pendingEncoding: "Video awaiting encoding",
    encodingCompleted: "Encoding completed",
    encodingError: "Encoding error",

    // Results
    noVideosFound: "No videos found.",
  },

  videoAction: {
    edit: "Edit video",
    duplicate: "Duplicate",
    duplicating: "Duplicating…",
    delete: "Delete video",
    deleteConfirm: "Are you sure you want to delete the video “{title}”?",
  },

  videoPlayer: {
    unableToLoad: "Unable to load the video.",
    unableToDownload: "Unable to download the video.",
    encodingInProgress: "Video is being encoded…",
    retry: "Retry",
  },

  videoDressing: {
    // Branding
    dressing: "Video branding",
    title: "Branding title",
    unique: "Unique name used to identify the branding",
    loading: "Loading branding…",
    noDressing: "No branding available at the moment.",
    noConfig: "No configured elements",

    // Elements
    watermark: "Watermark",
    opacity: "Opacity",
    start: "Intro",
    end: "Outro",
    addWatermark:
      "To add a watermark or intro/outro elements, create a new branding and then edit it.",

    // Actions & feedback
    create: "Create new branding",
    creation: "Creating…",
    successCreate: "Branding applied successfully",
    errorUpdate: "Error while updating the branding",
  },

  videoPage: {
    // Actions
    back: "Back",
    share: "Share",
    playlist: "Playlist",
    favorite: "Favorite",
    report: "Report",
    editVideo: "Edit video",
    addToPlaylist: "Add to playlist",
    copyLink: "Copy link",
    linkCopied: "Link copied!",
    seeMore: "See more",
    seeLess: "See less",
    download: "Download",
    chooseQuality: "Choose quality:",
    shareOn: "Share on {network}",

    // Information
    about: "About",
    type: "Type",
    channel: "Channel",
    channelWithId: "Channel {id}",
    creator: "Creator",
    mainLanguage: "Main language",
    keywords: "Keywords",
    keywordsloading: "Loading keywords…",
    discipline: "Discipline(s)",
    contributors: "Contributors",
    license: "License",
    cursus: "Education level",
    eventDate: "Event date",
    resources: "Resources",
    updatedAt: "Updated on:",
    views: "views",
    none: "None",

    // States & messages
    notFound: "Video not found.",
    noPlaylistsAvailable: "No playlists available",
    protectedByPassword: "This video is password-protected.",
    unlock: "Unlock video",
    unlocking: "Unlocking…",
    videoAddedToPlaylist: "Video added to playlist “{title}”.",
    videoRemovedFromPlaylist: "Video removed from playlist “{title}”.",
    videoAddedToFavorites: "Video added to your favorites.",
    videoRemovedFromFavorites: "Video removed from your favorites.",
  },

  contributors: {
    // Form
    defaultRole: "Director",
    searchLabel: "Search for a contributor…",
    roleLabel: "Role",
    functionLabel: "Position / Title",

    // Messages
    addError:
      "Unable to add this contributor (perhaps already added with this role?)",
    noContributors: "No associated contributors.",
  },

  documents: {
    // Form
    addTitle: "Add a document",
    titleLabel: "Document title",
    dropzone: "Drag and drop a file here",
    selectedFile: "Selected file:",
    privateLabel: "Private document (visible only to the owner and co-owners)",
    addBtn: "Add document",

    // List
    loading: "Loading documents…",
    addedOn: "{title} - Added on {date}",
    private: "Private",
    noDocuments: "No documents are currently attached to this video.",

    // Messages
    fillTitleAndFile: "Please enter a title and select a file.",
    uploadError: "Error while uploading the document.",
    deleteConfirm: "Are you sure you want to delete this document?",
    deleteError: "Error while deleting.",
    loadError: "Unable to load documents.",
  },

  chapters: {
    // Adding
    addTitle: "Add a chapter",
    titleLabel: "Chapter title",
    titlePlaceholder: "e.g. Introduction, Demo, Conclusion…",
    captureMoment: "Capture this moment",
    captureTooltip: "Copies the current time into the Time field",
    timeLabel: "Time",
    empty:
      "No chapters. Watch the video and click <strong>Capture this moment</strong> to add an entry.",
    countLabel: "Chapters ({count})",
    addError: "Error while adding",

    // List
    noChapters:
      "No chapters. Watch the video and click <bold>Capture this moment</bold> to add an entry.",
    goToMoment: "Click to go to this moment",
    deleteChapter: "Delete this chapter",

    // Messages
    titleRequired: "Please enter a title.",
    timestampTooLong: "The timestamp exceeds the video duration ({duration}).",
    playerUnavailable:
      "The player will be available once encoding is complete. You can enter timestamps manually.",
  },

  comments: {
    // List
    title: "Comments",
    count: "{count} comment",
    countPlural: "{count} comments",
    noCommentsYet: "No comments yet.",
    disabled: "Comments are disabled for this video.",
    loginToComment: "Log in to add a comment.",

    // Input
    addPlaceholder: "Add a comment",
    submit: "Comment",
    submitting: "Posting…",
    yourReply: "Your reply",

    // Actions
    reply: "Reply",
    delete: "Delete",
    voteForComment: "Vote for this comment",
    liked: "You like this comment",

    // Replies
    hideReplies: "Hide replies",
    showReplies: "{count} reply",
    showRepliesPlural: "{count} replies",
  },

  socialNetworks: {
    unableToLoad: "Unable to load social networks.",
    loading: "Loading social networks…",
    errorSaveSocial: "An error occurred while saving the social network.",
    saved: "Social network saved successfully.",
    authorizedShare: "Social network authorized for sharing.",
    choice: "Select a social network",
  },

  videoEdit: {
    // Header & actions
    pageTitle: "Edit video “{title}”",
    pageTitleDefault: "Edit video",
    duplicate: "Duplicate",
    save: "Save",
    quit: "Leave page",
    previous: "Previous",
    next: "Next",
    requiredFieldsPrompt: "Fields marked with * are required.",

    // Steps
    stepImport: "Import",
    stepDetails: "Details",
    stepElements: "Video Elements",
    stepVisibility: "Visibility",

    // Stepper & badges
    noSourceFileBadge: "Information: Source file not imported",
    incompleteBadge: "Incomplete",
    completedBadge: "Completed",
    stepInProgress: "Step in progress",
    mediaAttached: "Source available",
    titleFilled: "Title entered",
    titleRequired: "Title required",
    subtitlesAndDocs: "Subtitles & additional content",
    draftOrPublic: "Draft, restricted or public",

    // Details step
    titleLabel: "Title",
    titlePlaceholder: "Video title",
    titleHelper:
      "A title that is as short and precise as possible, reflecting the main subject / context of this content.",
    descriptionLabel: "Description",
    descriptionPlaceholder: "Video description in English",
    descriptionHelper:
      "Describe your content, add all necessary information, and format the result.",
    mainLanguageLabel: "Main language",
    mainLanguageHelper: "The main language used in this content.",
    tagsHelper: "Enter keywords separated by commas.",
    thumbnailLabel: "Thumbnails",
    uploadThumbnailBtn: "+ Upload a thumbnail",
    thumbnailDimensionsHint: "JPG or PNG · Recommended: 1280 × 720 px",
    thumbnailCopyrightHelper:
      "The thumbnail must comply with community guidelines. Make sure you have the appropriate copyright permissions for the image.",
    changeBtn: "Change",
    deleteBtn: "Delete",
    ownerLabel: "Owner",
    ownerHelper: "A superuser can change the owner of a video.",
    coOwnersLabel: "Additional owners",
    coOwnersHelper:
      "Additional owners will have the same rights as you, except that they cannot delete this content.",
    licenseLabel: "License",
    licenseHelper: "Usage rights for your content.",
    channelLabel: "Channel",
    channelHelper:
      "You have permission to associate this video with a channel.",
    noneOption: "None",
    themesLabel: "Themes",
    themesHelper: "You can select one or more themes related to the channel.",
    dateToDeleteLabel: "Deletion date",
    dateToDeleteHelper: "Scheduled deletion date for the video.",
    dateOfEventLabel: "Event date",
    dateOfEventHelper: "Date of the event associated with this video.",
    publicationDateLabel: "Scheduled publication date and time",
    publicationDateHelper:
      "Set a future date/time when the video will be made public.",
    statusLabel: "Video status",
    typeLabel: "Type",
    tagsLabel: "Keywords",
    cursusLabel: "Education level",
    themesPlaceholder: "Select one or more themes",

    // Import step
    importHeaderTitle: "Add a video file",
    importHeaderSub: "Manage the source video and encoding of your media.",
    noSourceWarningTitle: "Empty record without video source",
    noSourceWarningDesc:
      "This video does not yet have an associated source file. You can complete the metadata (title, description, etc.), but you must add a video below before you can publish it.",
    publicNoSourceAlert:
      "You selected the Public status but no source file has been imported. Import is required for public publication.",
    selectVideoFile:
      "Select a video file from your computer. A new encoding process will be started automatically.",
    addVideoFileBtn: "Add video",

    // Video elements step
    elementsHeaderSub:
      "Enrich your video with subtitles, documents and contributors.",
    subtitlesTitle: "Manual subtitles",
    subtitlesDesc: "Add subtitle files (.vtt, .srt) in one or more languages.",
    documentsTitle: "Attached documents",
    documentsDesc:
      "Attach PDF files, slide decks or other downloadable documents.",
    contributorsTitle: "Contributors & Speakers",
    contributorsDesc: "Add authors, directors or speakers to your video.",
    chaptersTitle: "Chapter the video",
    chaptersDesc: "Divide your video into chapters with time markers.",
    dressingTitle: "Style the video",
    dressingDesc: "Apply branding (watermark, intro / outro).",
    position: "Watermark position",
    opacity: "Watermark opacity",
    trimTitle: "Trim the video",
    trimDesc: "Set a start and end point to shorten the video.",
    chaptersDialogTitle: "Video chapters",

    // Visibility step
    visibilityHeaderSub:
      "Choose when to publish your video and who can see it.",
    restrictionsHeader: "Restrictions",
    restrictionsSub:
      "Choose whether to make your video public, unlisted or private.",
    draftPrivateTitle: "Draft / Private",
    draftPrivateDesc:
      "In “Draft / Private” mode, the content does not appear anywhere and no one other than you can see it.",
    restrictedTitle: "Restricted access",
    restrictedDesc:
      "In “Restricted access” mode, you can choose the restrictions for the video.",
    publicTitle: "Public",
    publicDesc: "In “Public” mode, the content is visible to everyone.",
    noSourceDraftNotice:
      "Without a source file, only Draft / Private mode is allowed. Restricted access and Public modes are disabled.",
    restrictionOptions: "Restriction options:",
    authRequiredLabel: "Authentication required",
    authRequiredHelper: "Limit access to authenticated users.",
    authUserOnly: "Restricted to authenticated users.",
    passwordRequiredLabel: "Password required",
    passwordLabel: "Video password",
    diffusionTitle: "Playback configuration",
    allowDownloadLabel: "Allow downloading",
    allowDownloadHelper: "Allow downloading your video.",
    disableCommentsLabel: "Disable comments",
    disableCommentsHelper: "Disable adding comments to your video.",
    advancedOptionsTitle: "Advanced options",
    is360Label: "This is a 360° video",
    is360Helper: "Enable the 360° player for this video.",
    passwordKeepHelper: "Leave blank to keep the existing password unchanged.",

    // Messages & validation
    fillRequiredFields:
      "Please fill in the required field(s) before continuing: {fields}.",
    fillRequiredFieldsStep:
      "Please fill in the required field(s) in the “{step}” step before continuing: {fields}.",
    restrictedNeedsOption:
      "For a restricted status, choose at least one restriction.",
    noPermission: "You do not have permission to edit this video.",
    loginRequired: "You must be logged in to edit this video.",
    updateSuccess: "Video updated successfully!",

    // Subtitles
    addSubtitle: "Add a subtitle",
    activeSubtitleCount: "{count, plural, one {# active} other {# active}}",
    noSubtitles: "No subtitles added.",
    subtitleDescription:
      "Add subtitle files in .vtt or .srt format. Each file corresponds to a language.",
    subtitleLanguageLabel: "Language",
    subtitleFileHint: "Select a .vtt or .srt file",
    addSubtitleBtn: "Add subtitle",
    cannotAddSubtitle: "Unable to add a subtitle to this video.",
    selectSubtitleFile: "Please select a subtitle file.",
    privateVideoTooltip: "Private video",
    passwordProtectedVideoTooltip: "Password-protected video",
    noSourceForPublic:
      "No source file was imported during the Import step. The record cannot be published in Public mode.",

    // Source change
    changeSourceTitle: "Change video source",
    sourceCurrentLabel: "Current source",
    changeSourceDesc:
      "Replace the source file of this video. A new encoding process will be started.",
    selectNewVideoFile: "Select a new video file",
    replaceSourceBtn: "Replace source",
    changeSourceError: "Error while changing the source.",
    sourceUpdated: "Video source updated. Re-encoding started.",
  },

  favorites: {
    title: "My favorite videos",
    startPlaylist: "Start playlist",
    noFavorites: "No favorite videos at the moment.",
    noMatchingFilters: "No videos match your filters.",
    favoriteUpdateError: "An error occurred while updating favorites.",
  },

  playlists: {
    // Titles & labels
    myTitle: "My playlists",
    playlists: "Playlists",
    playlist: "Playlist",
    nowPlaying: "Now playing",
    notFound: "Playlist not found.",
    unableToLoad: "Unable to load the playlist",
    backToMyPlaylists: "Back to my playlists",

    // Creation & editing
    addPlaylist: "Add a playlist",
    addThePlaylist: "Add the playlist",
    editPlaylist: "Edit playlist",
    seePlaylist: "View playlist",
    playlistCreated: "The playlist was created successfully.",
    playlistUpdated: "Playlist updated successfully!",
    noPermissionToEditPlaylist:
      "You do not have permission to edit this playlist.",

    // Deletion
    delete: "Delete playlist",
    deleteConfirm: "Are you sure you want to delete this playlist?",
    deleteSuccess: "The playlist was deleted successfully.",

    // Empty lists
    noVideos: "No videos in this playlist",
    noPlaylists: "You do not have any playlists yet.",
    noMatchingFilters: "No playlists match your filters.",
    noPublicPlaylists: "No playlists available at the moment.",

    // Errors
    creationError: "An error occurred while creating the playlist.",
    deleteError: "An error occurred while deleting the playlist.",
    playlistUpdateError: "An error occurred while updating the playlist.",

    // Visibility
    passwordProtected: "Password-protected playlist",
    private: "Private playlist",

    // Form
    titleHelper: "Give your playlist a short and descriptive title.",
    descriptionHelper: "Describe the content and/or context of your playlist.",
    accessRestrictions: "Access restrictions",
    protectWithPassword: "Protect my playlist with a password",
    addPassword: "Add a password",
    passwordLabel: "Playlist password",
    passwordHelper: "Add a password to access the playlist.",
    visibleToAll: "Your playlist will be visible to all users.",
    visibleToOwner: "Your playlist will only be visible to you.",
    defaultSort: "Default sorting",
    defaultSortLabel: "Default sorting for video display.",
    defaultSortHelper: "Choose the order in which videos are displayed.",
    publicPlaylist: "Public playlist",
  },

  channels: {
    // General
    title: "Channels",
    content: "Channel content",
    unclassified: "Unclassified videos",

    // Empty lists
    noChannels: "No channels available at the moment.",
    noMatchingFilters: "No channels match your filters.",
    noContent: "This channel has no associated videos or themes.",
    noTheme: "This channel has no associated themes.",
    noThemes: "No themes match your search criteria.",
    noVideos: "This channel has no associated videos.",
  },

  dressingPage: {
    title: "Video Branding & Watermarks",
    pageDescription:
      "Manage your watermarks and visual elements to embed them directly into your videos.",
    myWatermarks: "My Watermarks",
    addWatermark: "Add a watermark",
    uploading: "Uploading…",
    noWatermarks: "You have not uploaded a watermark yet.",
    deleteConfirm: "Are you sure you want to delete this watermark?",
    loadError: "Error while loading watermarks.",
    uploadError: "Error while uploading the image",
  },

  // === Page metadata ===
  titles: {
    // Page titles
    platform: "Esup-Pod Video Platform",
    login: "Login | Esup-Pod",
    video: "Video | Esup-Pod",
    allVideos: "All videos - Esup-Pod",
  },

  descriptions: {
    dashboard: "Manage your videos and settings from your Esup-Pod dashboard.",
    login: "Log in to access your videos and personal space on Esup-Pod.",
    playlists: "Discover and manage public playlists on the Esup-Pod platform.",
    videos: "Discover all public videos on the Esup-Pod platform.",
    watchVideo: "Watch the video on Esup-Pod",
  },
};
