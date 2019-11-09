const FOCUSABLE_QUERY =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const dialogMachine = Machine(
  {
    id: 'dialog (modal)',
    initial: 'closed',
    context: {
      // to be passed in as a ref to the dom node with is the modal container
      // used for focus trapping
      containerEl: document.querySelector('body'),
      // The currently focused element.
      // We will set this when opened and what tabbing around the dialog.
      focusedElement: null,
      firstFocusable: null,
      lastFocusable: null
    },
    states: {
      closed: {
        on: {
          OPEN: {
            target: 'showing',
            actions: [
              assign({
                focusedElement: (ctx, e) => ctx.containerEl,
                firstFocusable: (ctx, e) =>
                  ctx.containerEl.querySelectorAll(FOCUSABLE_QUERY)[0],
                lastFocusable: (ctx, e) =>
                  Array.from(
                    ctx.containerEl.querySelectorAll(FOCUSABLE_QUERY)
                  ).slice(-1)
              }),
              'onOpen'
            ]
          }
        }
      },
      showing: {
        on: {
          TAB: {
            target: 'showing',
            actions: [
              assign({
                focusedElement: (ctx, e) => {
                  if (ctx.focusedElement === ctx.lastFocusable) {
                    return ctx.firstFocusable;
                  }
                }
              }),
              'onTab'
            ]
          },
          SHIFT_TAB: {
            target: 'showing',
            actions: [
              assign({
                focusedElement: (ctx, e) => {
                  if (ctx.focusedElement === ctx.firstFocusable) {
                    return ctx.lastFocusable;
                  }
                }
              }),
              'onShiftTab'
            ]
          },
          ESCAPE: {
            target: 'closed',
            actions: [
              assign({
                containerEl: () => document.querySelector('body'),
                focusedElement: () => null,
                firstFocusable: () => null,
                lastFocusable: () => null
              }),
              'onClose'
            ]
          }
        }
      }
    }
  },
  {
    actions: {
      onOpen: (context, event) => {
        console.log(context, event);
        console.log('Open the modal');
      },
      onClose: (context, event) => {
        console.log('Close the modal', context);
      },
      onTab: (context, event) => {
        console.log('Focus next element', context);
      },
      onShiftTab: (context, event) => {
        console.log('Focus previous element');
      }
    }
  }
);
