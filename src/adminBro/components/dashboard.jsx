import React, { useState, useEffect } from "react";
import { ApiClient, useCurrentAdmin } from "admin-bro";
import {
  Box,
  Header,
  Link,
  Loader,
  Illustration,
} from "@admin-bro/design-system";

const api = new ApiClient();

const Dashboard = () => {
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getDashboard().then((response) => {
      setData(response.data);
      setIsLoading(false);
    });
  }, []);

  console.log(data);

  let content = <Loader />;
  let postsToAcceptBox = null;
  let activeInfoModalBox = null;

  if (!isLoading) {
    if (data.isPostsToAccept && currentAdmin.role === "admin") {
      content = null;
      postsToAcceptBox = (
        <Box variant="grey">
          <Box variant="card">
            <Illustration variant="DocumentCheck" />
            <Header.H4 fontWeight="bold">
              Niektóre artykuły czekają na publikacje, sprawdź je{" "}
              <Link
                href={
                  data.postsToAcceptURL +
                  "/admin/resources/Post?filters.show=false&page=1"
                }
                variant="info"
              >
                TUTAJ
              </Link>
            </Header.H4>
          </Box>
        </Box>
      );
    } else {
      content = (
        <Box variant="grey">
          <Box variant="card">
            <Illustration variant="Folders" />
            <Header.H4 fontWeight="bold">Panel administracyjny Hufca</Header.H4>
          </Box>
        </Box>
      );
    }
    if (data.isInfoModalActive && currentAdmin.editingPermissions.infoModal) {
      content = null;
      activeInfoModalBox = (
        <Box variant="grey">
          <Box variant="card">
            <Illustration variant="FileSearch" />
            <Header.H4 fontWeight="bold">
              Alert informacyjny jest włączony na stronie, możesz go wyłączyć{" "}
              <Link
                href={data.postsToAcceptURL + "/admin/resources/InfoModal"}
                variant="info"
              >
                TUTAJ
              </Link>
            </Header.H4>
          </Box>
        </Box>
      );
      // } else {
      //   content = (
      //     <Box variant="grey">
      //       <Box variant="card">
      //         <Illustration variant="Folders" />
      //         <Header.H4 fontWeight="bold">Panel administracyjny Hufca</Header.H4>
      //       </Box>
      //     </Box>
      //   );
    }
  }

  return (
    <React.Fragment>
      <center>
        {content}
        {activeInfoModalBox}
        {postsToAcceptBox}
      </center>
    </React.Fragment>
  );
};

export default Dashboard;
