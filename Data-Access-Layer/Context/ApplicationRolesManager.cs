using Data_Access_Layer.Entities;
using Data_Access_Layer.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data_Access_Layer.Context
{
    public class ApplicationRolesManager : RoleManager<ApplicationRole>
    {

        public ApplicationRolesManager(
            IRoleStore<ApplicationRole> store,
            IEnumerable<IRoleValidator<ApplicationRole>> roleValidators,
            ILookupNormalizer lookupNormalizer,
            IdentityErrorDescriber errors,
            ILogger<RoleManager<ApplicationRole>> logger
            )
                : base(
                      store,
                      roleValidators,
                      lookupNormalizer,
                      errors,
                      logger
                      )
        {
        }

    }
}
