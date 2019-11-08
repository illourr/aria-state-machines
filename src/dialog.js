const dialogMachine = Machine(
  {
    id: "dialog (modal)",
    initial: "unmounted",
    context: {
      retries: 0
    },
    states: {
      unmounted: {
        on: {
          OPEN: "idle"
        }
      },
      idle: {
        on: {
          TAB: {
            target: "idle",
            actions: ["nextElement"]
          },
          SHIFT_TAB: {
            target: "idle",
            actions: ["previousElement"]
          },
          ESCAPE: {
            target: "unmounted",
            actions: ["close"]
          }
        }
      }
    }
  },
  {
    actions: {
      nextElement: (context, event) => {
        console.log("Focus next element");
      },
      previousElement: (context, event) => {
        console.log("Focus previous element");
      },
      close: (context, event) => {
        console.log("Close the modal");
      }
    }
  }
);

const dialogWithActions = dialogMachine.withConfig({
  actions: {
    nextElement: (context, event) => {
      console.log("Focus next element");
    },
    previousElement: (context, event) => {
      console.log("Focus previous element");
    },
    close: (context, event) => {
      console.log("Close the modal");
    }
  }
});
