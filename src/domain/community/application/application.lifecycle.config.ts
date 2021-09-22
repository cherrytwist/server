export const applicationLifecycleConfig = {
  id: 'user-application-2',
  context: {
    parentID: '',
  },
  initial: 'new',
  states: {
    new: {
      on: {
        APPROVE: {
          target: 'approved',
          cond: 'communityUpdateAuthorized',
        },
        REJECT: 'rejected',
        ABORT: {
          // Allows aborting of the application process e.g. if user is directly added
          target: 'archived',
          cond: 'communityUpdateAuthorized',
        },
      },
    },
    approved: {
      type: 'final',
      entry: ['communityAddMember'],
      data: {
        applicationID: (context: any, _event: any) => context.parentID,
      },
    },
    rejected: {
      on: {
        REOPEN: 'new',
        ARCHIVE: 'archived',
        ABORT: {
          // Allows aborting of the application process e.g. if user is directly added
          target: 'archived',
          cond: 'communityUpdateAuthorized',
        },
      },
    },
    archived: {
      type: 'final',
    },
  },
};
