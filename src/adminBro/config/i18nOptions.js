const i18nOptions = {
  language: "pl",
  translations: {
    actions: {
      new: "Utwórz",
      edit: "Edytuj",
      show: "Detale",
      delete: "Usuń",
      bulkDelete: "Usuń zaznaczone",
      list: "Lista danych",
    },
    buttons: {
      save: "Zapisz",
      addNewItem: "Dodaj nowy rekord",
      filter: "Filtruj",
      applyChanges: "Zapisz",
      resetFilter: "Resetuj",
      confirmRemovalMany: "Potwierdź usunięcie {{count}} rekordu",
      confirmRemovalMany_plural: "Potwierdź usunięcie {{count}} rekordów",
      logout: "Wyloguj",
      createFirstRecord: "Utwórz pierwszy rekord",
    },
    labels: {
      navigation: "Menu",
      pages: "Strony",
      selectedRecords: "Wybrano ({{selected}})",
      filters: "Filtry",
      adminVersion: "Admin: {{version}}",
      appVersion: "App: {{version}}",
      loginWelcome: "Witaj w panelu administracyjnym Hufca",
      User: "Użytkownicy",
      Team: "Drużyny",
      Post: "Artykuły",
      Contact: "Dane kontaktowe",
      Document: "Adres URL do Dokumentów",
      Gallery: "Adres URL do Galerii zdjęć",
      InfoModal: "Alert informacyjny",
    },
    messages: {
      successfullyBulkDeleted: "Pomyślnie usunięto {{count}} rekord",
      successfullyBulkDeleted_plural: "Pomyślne usunięcie {{count}} rekordów",
      successfullyDeleted: "Pomyślnie usunięto dany rekord",
      successfullyUpdated: "Pomyślnie zaaktualizowano dany rekord",
      thereWereValidationErrors:
        "Wystąpiły błędy walidacji - sprawdź je poniżej",
      forbiddenError:
        "Nie możesz wykonać akcji {{actionName}} na {{resourceId}}",
      anyForbiddenError: "Nie możesz wykonać tej akcji",
      successfullyCreated: "Pomyślnie utworzono nowy rekord",
      bulkDeleteError:
        "Wystąpił problem podczas usuwania wielu rekordów, Sprobój ponowanie lub skontaktuj się z administratorem",
      errorFetchingRecords:
        "Wystąpił problem podczas pobierania danych z bazy, Sprobój ponowanie lub skontaktuj się z administratorem",
      errorFetchingRecord:
        "Wystąpił problem podczas pobierania danego rekordu z bazy, Sprobój ponowanie lub skontaktuj się z administratorem",
      noRecordsSelected: "Nie wybrałeś żadnych rekordów",
      theseRecordsWillBeRemoved: "Zaznaczony rekord zostanie usunięty",
      theseRecordsWillBeRemoved_plural: "Zaznaczone rekordy zostaną usunięte",
      pickSomeFirstToRemove: "Aby usunąć rekordy, musisz je najpierw zaznaczyć",
      error404Resource:
        "Rekord o podanym id: {{resourceId}} nie może zostać odnaleziony",
      error404Action:
        "Rekord o podanym id: {{resourceId}} nie posiada akcji o nazwie: {{actionName}} lub nie masz do niej dostępu!",
      error404Record:
        "Kolekcja danych o podanym id: {{resourceId}} nie posiada rekordu z id: {{recordId}} lub nie masz do niego dostępu!",
      seeConsoleForMore: "See development console for more details...",
      noActionComponent:
        "You have to implement action component for your Action",
      noRecordsInResource: "Brak rekordów w tej kolekcji danych",
      noRecords: "Brak rekordów",
      confirmDelete: "Czy napewno chcesz usunąć ten rekord?",
      welcomeOnBoard_title: "",
      welcomeOnBoard_subtitle: "",
      loginWelcome: "",
      addingResources_title: "Adding Resources",
      addingResources_subtitle: "How to add new resources to the sidebar",
      customizeResources_title: "Customize Resources",
      customizeResources_subtitle:
        "Defining behavior, adding properties and more...",
      customizeActions_title: "Customize Actions",
      customizeActions_subtitle: "Modifying existing actions and adding new",
      writeOwnComponents_title: "Write Components",
      writeOwnComponents_subtitle: "How to modify the Look and Feel of AdminJS",
      customDashboard_title: "Custom Dashboard",
      customDashboard_subtitle:
        "How to modify this view and add new Pages on the sidebar",
      roleBasedAccess_title: "Role-Based Access Control",
      roleBasedAccess_subtitle: "Create user roles and permissions in AdminJS",
      community_title: "Join the slack community",
      community_subtitle:
        "Talk with the creators of AdminJS and other AdminJS users",
      foundBug_title: "Found a Bug? need improvement?",
      foundBug_subtitle: "Raise an issue on our GitHub repo",
      needMoreSolutions_title: "Need more advanced solutions?",
      needMoreSolutions_subtitle:
        "We are here to provide you a beautiful UX/UI design and tailor made software based (not only) on AdminJS",
      invalidCredentials: "Błędny email i/lub hasło",
    },
    resources: {
      User: {
        properties: {
          email: "Email",
          password: "Hasło",
          role: "Rola",
          "role.admin": "Administrator",
          "role.restricted": "Zwykły",
          "editingPermissions.postsMustBeApprovedByAdmin":
            "Artykuły muszą być zatwierdzane przez administratora",
          "editingPermissions.team":
            "Użytkownik może edytować stronę o swojej drużynie",
          "editingPermissions.contact":
            "Użytkownik może edytować dane kontaktowe hufca na stronie",
          "editingPermissions.document":
            "Użytkownik może edytować adres URL Dokumentów na stronie",
          "editingPermissions.gallery":
            "Użytkownik może edytować adres URL Galerii zdjęć na stronie",
          "editingPermissions.infoModal":
            "Użytkownik może edytować alert informacyjny",
          scoutTeam: "Drużyna",
        },
      },
      Team: {
        properties: {
          name: "Nazwa drużyny",
          description: "Opis drużyny",
          "contact.email": "Email",
          "contact.phone": "Telefon",
          "contact.facebookURL": "Link do strony na Facebooku",
          "contact.instagramURL": "Link do strony na Instagramie",
          photosURL: "Linki do zdjęć",
        },
      },
      Post: {
        properties: {
          content: "Treść",
          preview: "Krótki opis",
          imageURL: "Adres URL do głównego obrazu artykułu",
          filesURL: "Adresy URL do załączanych plików",
          expireAt: "Data publikacji artykułu (domyślnie aktualna data)",
        },
      },
      Contact: {
        properties: {
          email: "Email",
          phone: "Telefon",
          "address.city": "Miasto",
          "address.street": "Ulica",
          "address.postCode": "Kod pocztowy",
          facebookURL: "Adres URL Facebooka",
          instagramURL: "Adres URL Instagrama",
        },
      },
      Document: {
        properties: {
          documentsURL: "Adres URL do Dokumentów na stronie",
        },
      },
      Gallery: {
        properties: {
          galleryURL: "Adres URL do Galerii zdjęć na stronie",
        },
      },
      InfoModal: {
        properties: {
          content: "Treść",
          show: "Wyświetl na stronie",
          expireAt: "Data wygaśnięcia alertu",
        },
      },
    },
  },
};

module.exports = i18nOptions;
