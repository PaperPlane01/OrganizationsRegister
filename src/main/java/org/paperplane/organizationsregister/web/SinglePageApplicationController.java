package org.paperplane.organizationsregister.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.ws.rs.Produces;


@Controller
@RequestMapping(value = "/")
public class SinglePageApplicationController {

    @RequestMapping(method = RequestMethod.GET)
    @Produces("text/html")
    public String showIndex() {
        return "index";
    }
}