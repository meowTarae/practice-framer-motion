import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;

  position: relative;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 20vw 20vw;
  grid-template-rows: 200px 200px;
  grid-gap: 12px;
`;

const Box = styled(motion.div)`
  border-radius: 10px;
  /* height: 200px; */
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.3);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerBox = styled(motion.div)`
  border-radius: 10px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const Ball = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 8px solid #8c7ae6;
  background-color: transparent;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Button = styled(motion.button)`
  background-color: white;
  margin-top: 4%;
  position: absolute;
  bottom: 24%;
  width: 72px;
  height: 36px;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0 15px;
  cursor: pointer;
  font-size: 14px;
`;

function App() {
  const [id, setId] = useState<null | string>(null);
  const [click, setClick] = useState(true);
  const onClick = () => {
    setClick((prev) => !prev);
  };
  return (
    <Wrapper>
      <Container>
        {["1", "2", "3", "4"].map((n) =>
          parseInt(n) === 2 ? (
            <Box onClick={() => setId(n)} key={n} layoutId={n}>
              {click ? <Ball layoutId="ball" /> : null}
            </Box>
          ) : parseInt(n) === 3 ? (
            <Box onClick={() => setId(n)} key={n} layoutId={n}>
              {!click ? <Ball layoutId="ball" /> : null}
            </Box>
          ) : (
            <Box
              onClick={() => setId(n)}
              key={n}
              layoutId={n}
              whileHover={{
                margin:
                  parseInt(n) === 1 ? "-20px 0 0 -20px" : "0 -20px -20px 0",
              }}
            />
          )
        )}
      </Container>

      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <InnerBox layoutId={id} style={{ width: 400, height: 200 }}>
              {(parseInt(id) === 2 && click) ||
              (parseInt(id) === 3 && !click) ? (
                <Ball layoutId="ball" />
              ) : null}
            </InnerBox>
          </Overlay>
        ) : null}
      </AnimatePresence>

      <Button
        onClick={onClick}
        style={{
          color: click ? "skyblue" : "orange",
        }}
        animate={{ scale: !click ? 1.2 : 1 }}
      >
        Switch
      </Button>
    </Wrapper>
  );
}

export default App;
